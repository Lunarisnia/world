layout(location = 0) out vec4 FragColor;
layout(location = 1) out vec4 BrightColor;

in vec2 vUv;

void main() {
    BrightColor = vec4(0.0f);

    FragColor = vec4(1.0f);
}
