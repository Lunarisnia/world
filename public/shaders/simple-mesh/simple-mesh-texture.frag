layout(location = 0) out vec4 FragColor;
layout(location = 1) out vec4 BrightColor;
in vec2 vUv;

uniform sampler2D uMap;

void main() {
    vec4 tex = texture2D(uMap, vUv);

    FragColor = vec4(tex);
    BrightColor = vec4(0.0f);
}
