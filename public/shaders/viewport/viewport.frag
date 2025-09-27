layout(location = 0) out vec4 FragColor;
in vec2 vUv;

uniform sampler2D uWorldTexture;

void main() {
    vec4 worldTexture = texture2D(uWorldTexture, vUv);

    vec3 color = vec3(worldTexture.xyz);
    FragColor = vec4(color, 1.0f);
}
