layout(location = 0) out vec4 FragColor;
layout(location = 1) out vec4 BrightColor;

in vec2 vUv;
in vec3 vNormal;
in vec3 vFragPos;
in vec3 vInverseMVPos;

uniform sampler2D uMatcap;

void main() {
    vec3 normal = vNormal;

    vec3 viewDir = normalize(vInverseMVPos);
    vec3 x = normalize(vec3(viewDir.z, 0.0, -viewDir.x));
    vec3 y = cross(viewDir, x);
    vec2 uv = vec2(dot(x, normal), dot(y, normal)) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

    vec4 matcapColor = texture2D(uMatcap, uv);

    FragColor = matcapColor;
    BrightColor = vec4(0.0f);
}
