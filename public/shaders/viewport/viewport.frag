layout(location = 0) out vec4 FragColor;
in vec2 vUv;

uniform sampler2D uWorldTexture;
uniform sampler2D uBloomTexture;
uniform sampler2D uDepthTexture;
uniform sampler2D uMaskTexture;

uniform mat4 uInverseProjectionMatrix;
uniform mat4 uInverseViewMatrix;

uniform float uTime;

// NOTE: Boilerplate for reading depth and linearizing it≤, provided by threejs
#include <packing>
float readDepth(sampler2D depthSampler, vec2 coord) {
    float cameraNear = 0.01f;
    float cameraFar = 1000.0f;

    float fragCoordZ = texture2D(depthSampler, coord).x;
    float viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);
    return viewZToOrthographicDepth(viewZ, cameraNear, cameraFar);
}

void main() {
    vec4 worldTexture = texture2D(uWorldTexture, vUv);
    vec4 bloomTexture = texture2D(uBloomTexture, vUv);
    vec4 maskTexture = texture2D(uMaskTexture, vUv);

    vec3 color = worldTexture.xyz + bloomTexture.xyz;

    float gamma = 2.2f;
    color = pow(color, vec3(1.0f / gamma));
    FragColor = vec4(color, 1.0f);
}
