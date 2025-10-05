out vec2 vUv;

void main() {
    gl_Position = vec4(position.xy, 0.0f, 1.0f);
    vUv = uv;
}
