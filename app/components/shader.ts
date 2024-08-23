export const vertex = `
uniform vec2 uOffset;
// the fact that the uOffset is lerped makes it looks soo frigging smooth
varying vec2 vUv;

float PI = 3.1415926535;

void main () {
    vUv = uv;
    vec3 newPosition = position;
    // 0 - 1 * pi = 0 - pi
    newPosition.x += sin(uv.y * PI) * uOffset.x * 0.0007;
    newPosition.y += sin(uv.x * PI) * uOffset.y * 0.0007;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;
export const fragment = `
uniform sampler2D uTexture;
uniform float  uAlpha;
varying vec2 vUv;

void main () {
    vec3 texture = texture2D(uTexture,vUv).rgb;
    gl_FragColor = vec4(texture, uAlpha);
}
`;
