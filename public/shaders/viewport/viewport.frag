layout(location = 0) out vec4 FragColor;
in vec2 vUv;

uniform sampler2D uWorldTexture;
uniform sampler2D uBloomTexture;
uniform sampler2D uDepthTexture;
uniform mat4 uInverseProjectionMatrix;
uniform mat4 uInverseViewMatrix;
uniform float uTime;

// NOTE: Boilerplate for reading depth and linearizing it≤, provided by threejs
#include <packing>
float readDepth(sampler2D depthSampler, vec2 coord) {
    float cameraNear = 0.01f;
    float cameraFar = 1000.0f;

    float fragCoordZ = texture2D(depthSampler, coord).x;
    float viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);
    return viewZToOrthographicDepth(viewZ, cameraNear, cameraFar);
}

// TODO: maybe its better to do it in a separate shader from the viewport
// NOTE: The camera for the viewport has to be the same camera with the main scene, or atleast the matrices has to come from there
vec3 reconstructWorldPos(vec2 uv, float depth) {
    float z = depth * 2.0f - 1.0f;
    vec4 clipPos = vec4(uv * 2.0f - 1.0f, z, 1.0f);

    vec4 viewPos = uInverseProjectionMatrix * clipPos;
    viewPos /= viewPos.w;

    vec4 worldPos = uInverseViewMatrix * viewPos;
    return worldPos.xyz;
}

// TODO: Render the other dimension in other scene
void main() {
    vec4 worldTexture = texture2D(uWorldTexture, vUv);
    vec4 bloomTexture = texture2D(uBloomTexture, vUv);

    float depthTexture = texture2D(uDepthTexture, vUv).x;
    vec3 wPos = reconstructWorldPos(vUv, depthTexture);
    float radius = 8.0f;
    float dist = step(length(wPos), radius);

    vec3 color = worldTexture.xyz + bloomTexture.xyz;
    color = mix(vec3(0.0f), color, dist);
    FragColor = vec4(color, 1.0f);
}
