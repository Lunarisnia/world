out vec2 vUv;
// out mat4 invViewMatrix;
// out mat4 invProjectionMatrix;

void main() {
    gl_Position = vec4(position.xy, 0.0f, 1.0f);

    // invViewMatrix = inverse(viewMatrix);
    // invProjectionMatrix = inverse(projectionMatrix);
    vUv = uv;
}
