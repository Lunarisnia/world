out vec2 vUv;
out vec3 vNormal;
out vec3 vFragPos;
out vec3 vPosition;
out vec3 vInverseMVPos;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0f);

    vFragPos = vec3(modelMatrix * vec4(position, 1.0f));

    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vInverseMVPos = -vec3(modelViewMatrix * vec4(position, 1.0f));

    vPosition = position;
}
