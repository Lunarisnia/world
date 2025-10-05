layout(location = 0) out vec4 FragColor;
layout(location = 1) out vec4 BrightColor;

in vec2 vUv;
in vec3 vNormal;
in vec3 vFragPos;

void main() {
    BrightColor = vec4(0.0f);

    // float dist = sdfSphere(vUv, 2.5f);

    // vec3 color = mix(vec3(1.0f, 0.0f, 0.0f), vec3(0.0f, 1.0f, 0.0f), dist);
    vec3 color = vNormal;
    FragColor = vec4(color, 1.0f);
}
