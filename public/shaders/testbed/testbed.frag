layout(location = 0) out vec4 FragColor;
layout(location = 1) out vec4 BrightColor;
in vec2 vUv;

uniform sampler2D uWorldTexture;

void main() {
    vec4 worldTexture = texture2D(uWorldTexture, vUv);

    vec3 color = vec3(worldTexture.xyz);
    FragColor = vec4(vec3(1.0f, 1.0f, 0.0f), 1.0f);

    BrightColor = vec4(0.0f);
}
