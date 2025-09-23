in vec2 vUv;

uniform float uAspectRatio;

float sdfCircle(vec2 origin, float r) {
    return length(origin) - r;
}

float circleTone(vec2 st) {
    st -= 0.5f;
    st.x *= uAspectRatio;
    float circle = sdfCircle(st, 0.10f);

    circle = smoothstep(0.21f, 0.2f, circle);
    return circle;
}

void main() {
    vec2 st = vUv;

    vec2 grid = fract(vUv * 32.0f);
    float tone = circleTone(grid);

    float gradient = (st.x - st.y);

    float halfTone = tone * gradient;
    vec3 color = vec3(0.0f);
    gl_FragColor = vec4(color, halfTone);
}
