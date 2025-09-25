out vec2 vUv;
out vec3 vNormal;
out vec3 vFragPos;
out vec3 vPosition;

out mat4 vModelMatrix;
uniform float uTime;

// Source: https://www.shadertoy.com/view/4dffRH
vec3 hash(vec3 p) // this hash is not production ready, please
{ // replace this by something better
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
            dot(p, vec3(269.5, 183.3, 246.1)),
            dot(p, vec3(113.5, 271.9, 124.6)));

    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float perlinNoise(in vec3 x)
{
    // grid
    vec3 p = floor(x);
    vec3 w = fract(x);

    // quintic interpolant
    vec3 u = w * w * w * (w * (w * 6.0 - 15.0) + 10.0);

    // gradients
    vec3 ga = hash(p + vec3(0.0, 0.0, 0.0));
    vec3 gb = hash(p + vec3(1.0, 0.0, 0.0));
    vec3 gc = hash(p + vec3(0.0, 1.0, 0.0));
    vec3 gd = hash(p + vec3(1.0, 1.0, 0.0));
    vec3 ge = hash(p + vec3(0.0, 0.0, 1.0));
    vec3 gf = hash(p + vec3(1.0, 0.0, 1.0));
    vec3 gg = hash(p + vec3(0.0, 1.0, 1.0));
    vec3 gh = hash(p + vec3(1.0, 1.0, 1.0));

    // projections
    float va = dot(ga, w - vec3(0.0, 0.0, 0.0));
    float vb = dot(gb, w - vec3(1.0, 0.0, 0.0));
    float vc = dot(gc, w - vec3(0.0, 1.0, 0.0));
    float vd = dot(gd, w - vec3(1.0, 1.0, 0.0));
    float ve = dot(ge, w - vec3(0.0, 0.0, 1.0));
    float vf = dot(gf, w - vec3(1.0, 0.0, 1.0));
    float vg = dot(gg, w - vec3(0.0, 1.0, 1.0));
    float vh = dot(gh, w - vec3(1.0, 1.0, 1.0));

    // interpolation
    return va +
        u.x * (vb - va) +
        u.y * (vc - va) +
        u.z * (ve - va) +
        u.x * u.y * (va - vb - vc + vd) +
        u.y * u.z * (va - vc - ve + vg) +
        u.z * u.x * (va - vb - ve + vf) +
        u.x * u.y * u.z * (-va + vb + vc - vd + ve - vf - vg + vh);
}

float fbm(vec3 position, int n, float persistence, float lacunarity) {
    float frequency = 1.0f;
    float amplitude = 0.5f;
    float total = 0.0f;
    float normalization = 0.0f;
    for (int i = 0; i < n; i++) {
        float noiseValue = perlinNoise(position * frequency);
        total += noiseValue * amplitude;
        normalization += amplitude;

        amplitude *= persistence;
        frequency *= lacunarity;
    }

    total /= normalization;

    return total;
}

float normalizeFBM(float n) {
    return (1.0f + n) / 2.0f;
}

void main() {
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0f);

    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vFragPos = vec3(modelMatrix * vec4(position, 1.0f));
    vModelMatrix = modelMatrix;
    vPosition = position;

    float eps = 0.01f;
    int octaves = 1;
    float persistence = 0.5;
    float lacunarity = 2.0;

    vec3 pos = vec3(vFragPos) + vec3(cos(uTime), -sin(uTime), sin(uTime));
    float noiseSample = fbm(pos, octaves, persistence, lacunarity);
    noiseSample = (1.0f + noiseSample) / 2.0f;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position + vNormal * noiseSample, 1.0f);
    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0f);
}
