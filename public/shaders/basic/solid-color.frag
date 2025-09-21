in vec2 vUv;

uniform vec3 color;

void main() {
    gl_FragColor = vec4(vec3(vUv, 0.0f), 1.0f);
}
