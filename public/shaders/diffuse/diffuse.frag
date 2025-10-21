layout(location = 0) out vec4 FragColor;
layout(location = 1) out vec4 BrightColor;
in vec2 vUv;
in vec3 vFragPos;
in vec3 vNormal;

uniform vec3 uEyePosition;
uniform vec3 uLightPosition;

void main() {
    vec3 lightPos = uLightPosition + vFragPos;

    vec3 lightDir = normalize(lightPos - vFragPos);
    float diff = max(0.0f, dot(lightDir, vNormal));

    vec3 color = diff * vec3(1.0f);
    FragColor = vec4(color, 1.0f);
    // FragColor = vec4(uLightPos, 1.0f);

    BrightColor = vec4(0.0f);
}
