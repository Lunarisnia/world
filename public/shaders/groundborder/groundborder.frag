in vec2 vUv;

void main() {
    vec3 color = vec3(abs(vUv), 0.0f);
    gl_FragColor = vec4(color, 1.0f);
}
