in vec2 vUv;

uniform float uTime;

vec2 calculatePosition(float t) {
    vec2 origin = vec2(0.0f);
    float phase = mod(t, 4.0f);

    if (phase < 1.0f) {
        origin = vec2(phase, 0.0f);
    } else if (phase < 2.0f) {
        origin = vec2(1.0f, phase - 1.0f);
    } else if (phase < 3.0f) {
        origin = vec2(1.0f - (phase - 2.0f), 1.0f);
    } else if (phase < 4.0f) {
        origin = vec2(0.0f, 1.0f - (phase - 3.0f));
    }

    return origin;
}

vec2 calculatePositionInverted(float t) {
    vec2 origin = vec2(1.0f);
    float phase = mod(t, 4.0f);

    if (phase < 1.0f) {
        origin = vec2(1.0f - phase, 1.0f);
    } else if (phase < 2.0f) {
        origin = vec2(0.0f, 1.0f - (phase - 1.0f));
    } else if (phase < 3.0f) {
        origin = vec2(phase - 2.0f, 0.0f);
    } else if (phase < 4.0f) {
        origin = vec2(1.0f, (phase - 3.0f));
    }

    return origin;
}

float drawSquare(vec2 uv, vec2 position, float t) {
    vec2 d = abs(uv - position);

    float square = step(max(d.x, d.y), 0.2f);
    return square;
}

void main() {
    float t = uTime * 0.5f;
    float square = drawSquare(vUv, calculatePosition(t), t);
    float square2 = drawSquare(vUv, calculatePositionInverted(t), t);

    vec3 color = vec3(1.0f);
    gl_FragColor = vec4(color, (square + square2) * 0.7f);
}
