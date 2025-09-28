layout(location = 0) out vec4 FragColor;

in vec2 vUv;

uniform sampler2D uImage;

uniform bool uHorizontal;
float uWeight[5] = float[](0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216);

void main()
{
    ivec2 iTexOffset = textureSize(uImage, 0); // gets size of single texel
    vec2 texOffset = 1.0f / vec2(300.0f);
    vec3 result = texture(uImage, vUv).rgb * uWeight[0]; // current fragment's contribution
    if (uHorizontal)
    {
        for (float i = 1.0f; i < 5.0; i += 1.0f)
        {
            result += texture(uImage, vUv + vec2(texOffset.x * i, 0.0)).rgb * uWeight[int(i)];
            result += texture(uImage, vUv - vec2(texOffset.x * i, 0.0)).rgb * uWeight[int(i)];
        }
    }
    else
    {
        for (float i = 1.0f; i < 5.0f; i += 1.0f)
        {
            result += texture(uImage, vUv + vec2(0.0, texOffset.y * i)).rgb * uWeight[int(i)];
            result += texture(uImage, vUv - vec2(0.0, texOffset.y * i)).rgb * uWeight[int(i)];
        }
    }
    FragColor = vec4(result, 1.0);
}
