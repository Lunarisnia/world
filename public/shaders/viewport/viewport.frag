#include <packing>
layout(location = 0) out vec4 FragColor;
in vec2 vUv;
// in mat4 invProjectionMatrix;
// in mat4 invViewMatrix;

uniform sampler2D uWorldTexture;
uniform sampler2D uBloomTexture;
uniform sampler2D uDepthTexture;
uniform mat4 invProjectionMatrix;
uniform mat4 invViewMatrix;
uniform float uTime;

float readDepth(sampler2D depthSampler, vec2 coord) {
    float cameraNear = 0.01f;
    float cameraFar = 1000.0f;

    float fragCoordZ = texture2D(depthSampler, coord).x;
    float viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);
    return viewZToOrthographicDepth(viewZ, cameraNear, cameraFar);
}

// TODO: maybe its better to do it in a separate shader from the viewport
// NOTE: So far this create something that as expected created a screen space mask.
// NOTE: I think the only way is probably just add the mask to every object that want to be masked
vec3 reconstructWorldPos(vec2 uv, float depth) {
    vec4 clipPos = vec4(uv * 2.0f - 1.0f, depth * 2.0f - 1.0f, 1.0f);

    vec4 viewPos = invProjectionMatrix * clipPos;
    viewPos /= viewPos.w;
    // viewPos.w = 1.0f / viewPos.w;
    // viewPos.xyz *= viewPos.w;

    vec4 worldPos = invViewMatrix * viewPos;
    return worldPos.xyz / worldPos.w;
}

void main() {
    vec4 worldTexture = texture2D(uWorldTexture, vUv);
    vec4 bloomTexture = texture2D(uBloomTexture, vUv);

    float fragCoordZ = texture2D(uDepthTexture, vUv).x;
    float depth = readDepth(uDepthTexture, vUv);
    vec3 wPos = reconstructWorldPos(vUv, fragCoordZ);

    float radius = 1.0f;
    float circle = distance(wPos, vec3(0.0f));
    float mask = smoothstep(radius - 0.05f, radius + 0.05f, circle);

    vec3 color = worldTexture.xyz + bloomTexture.xyz;
    color = mix(color, vec3(0.2f), mask);
    // vec3 color = vec3(mask);
    FragColor = vec4(color, 1.0f);
}
