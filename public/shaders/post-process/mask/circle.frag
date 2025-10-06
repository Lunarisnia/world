layout(location = 0) out vec4 FragColor;
in vec2 vUv;

uniform sampler2D uDepthTexture;

uniform mat4 uInverseProjectionMatrix;
uniform mat4 uInverseViewMatrix;
uniform float uTime;

uniform vec3 uPointPosition;
uniform float uRadius;

vec3 reconstructWorldPos(vec2 uv, float depth) {
    // Convert from NDC to Clip Space
    float z = depth * 2.0f - 1.0f;
    vec4 clipPos = vec4(uv * 2.0f - 1.0f, z, 1.0f);

    // Convert from Clip Space to Projection/View Space and does perspective division
    vec4 viewPos = uInverseProjectionMatrix * clipPos;
    viewPos /= viewPos.w;

    // Convert from Projection / View Space to World Space
    vec4 worldPos = uInverseViewMatrix * viewPos;

    return worldPos.xyz;
}

void main() {
    float rawDepth = texture2D(uDepthTexture, vUv).x;
    vec3 worldPosition = reconstructWorldPos(vUv, rawDepth);

    float dist = step(length(worldPosition - uPointPosition), uRadius);

    vec3 color = vec3(dist);
    FragColor = vec4(color, 1.0f);
}
