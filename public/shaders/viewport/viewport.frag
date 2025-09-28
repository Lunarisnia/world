layout(location = 0) out vec4 FragColor;
in vec2 vUv;

uniform sampler2D uWorldTexture;
uniform sampler2D uBloomTexture;

void main() {
    vec4 worldTexture = texture2D(uWorldTexture, vUv);
    vec4 bloomTexture = texture2D(uBloomTexture, vUv);

    vec3 color = worldTexture.xyz + bloomTexture.xyz;
    FragColor = vec4(color, 1.0f);
}
