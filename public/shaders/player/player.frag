layout(location = 0) out vec4 FragColor;
layout(location = 1) out vec4 BrightColor;
in vec2 vUv;
in vec3 vFragPos;
in vec3 vNormal;

uniform vec3 uEyePosition;
uniform sampler2D uMatcap;

vec2 matcap(vec3 eye, vec3 normal) {
    vec3 reflected = reflect(eye, normal);
    float m = 2.8284271247461903 * sqrt(reflected.z + 1.0);
    return reflected.xy / m + 0.5;
}

void main() {
    vec3 cameraDir = normalize(uEyePosition - vFragPos);
    vec2 uv = matcap(cameraDir, vNormal);

    vec4 matcapTexture = texture2D(uMatcap, uv);
    FragColor = matcapTexture;

    BrightColor = vec4(0.0f);
}
