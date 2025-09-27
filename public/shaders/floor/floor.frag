layout(location = 0) out vec4 FragColor;
layout(location = 1) out vec4 BrightColor;

in vec2 vUv;
in vec3 vNormal;

void main() {
    FragColor = vec4(vNormal, 1.0f);

    BrightColor = vec4(1.0f);
}
