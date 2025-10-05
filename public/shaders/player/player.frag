layout(location = 0) out vec4 FragColor;
layout(location = 1) out vec4 BrightColor;
in vec2 vUv;
in vec3 vFragPos;

float sdfCircle(vec3 origin, float r) {
    return length(origin) - r;
}

float circle(vec3 uv, float r) {
    return step(distance(uv, vec3(r)), r);
}

void main() {
    BrightColor = vec4(0.0f);

    // float dist = sdfCircle(vec3(0.0f), 0.1f);
    float dist = circle(vFragPos, 0.5f);
    // if (dist > 0.0f) {
    //     discard;
    // }

    vec3 color = vec3(dist);
    FragColor = vec4(color, 1.0f);
}
