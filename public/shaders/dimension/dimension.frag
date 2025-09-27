layout(location = 0) out vec4 FragColor;
layout(location = 1) out vec4 BrightColor;
in vec2 vUv;

uniform float uTime;
uniform sampler2D uWorldTexture;

void main() {
    vec4 sampledTexture = texture2D(uWorldTexture, vUv);

    vec3 color = vec3(sampledTexture.xyz);
    FragColor = vec4(color, 1.0f);

    BrightColor = vec4(0.0f);
}
