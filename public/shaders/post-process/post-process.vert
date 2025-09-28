out vec2 vUv;
out vec3 vNormal;
out vec3 vFragPos;
out vec3 vPosition;

void main() {
    gl_Position = vec4(position.xy, 0.0f, 1.0f);

    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vFragPos = vec3(modelMatrix * vec4(position, 1.0f));
    vPosition = position;
}
