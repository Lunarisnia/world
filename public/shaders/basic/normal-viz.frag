in vec2 vUv;
in vec3 vNormal;

void main() {
    gl_FragColor = vec4(vec3(abs(vNormal)), 1.0f);
}
