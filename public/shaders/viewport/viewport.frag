in vec2 vUv;

uniform sampler2D uWorldTexture;

void main() {
    vec4 worldTexture = texture2D(uWorldTexture, vUv);

    vec3 color = vec3(worldTexture.xyz);
    gl_FragColor = vec4(color, 1.0f);
}
