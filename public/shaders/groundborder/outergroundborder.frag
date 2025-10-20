layout(location = 0) out vec4 FragColor;
layout(location = 1) out vec4 BrightColor;

in vec2 vUv;

uniform float uTime;

void main() {
    vec3 color = vec3(1.0f);
    FragColor = vec4(color, 1.0f);

    BrightColor = vec4(0.0f);
}
