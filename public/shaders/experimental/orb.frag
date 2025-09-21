// in vec2 vUv;
// in vec3 vFragPos;
// in vec3 vPosition;
//
// float sdfCircle(vec3 pos, float r) {
//     return length(pos) - r;
// }
//
// void main() {
//     float radius = 0.3f;
//     float circle = sdfCircle(vFragPos, radius);
//
//     if (vFragPos.z < 0.0f) {
//         discard;
//     }
//
//     vec3 color = vec3(circle);
//     gl_FragColor = vec4(color, 1.0f);
// }

uniform float uTime;

in vec3 vPosition;
in vec3 vFragPos;
in vec2 vUv;

void main()
{
    float uStrikeWidth = 0.5;
    float uStrikeAlpha = 0.25;
    float uBorderWidth = 0.1;
    float uBorderAlpha = 0.5;

    vec3 vModelPosition = vFragPos;

    if (vModelPosition.z < 0.0)
    {
        discard;
    }

    float strikeStrength = mod((vPosition.x + vPosition.y - uTime * 0.00035 + vPosition.z) / uStrikeWidth * 0.5, 1.0);
    strikeStrength = step(strikeStrength, 0.5) * uStrikeAlpha;

    float borderStrength = max(step(1.0 - vUv.y, uBorderWidth), step(vUv.y, uBorderWidth)) * uBorderAlpha;

    float alpha = max(strikeStrength, borderStrength);

    gl_FragColor = vec4(vec3(1.0), alpha);

    // gl_FragColor = vec4(vUv, 1.0, 1.0);
}
