export const fragmentShader = `

#define PI 3.1415926535897932384626433832795;

uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

//varying vec2 vUv;
varying float vElevation;


void main()
{

    
   //        vec3 color = mix(uDepthColor, uSurfaceColor, vElevation);
    //separate colors more
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

    gl_FragColor = vec4(color, 1.0);

}
`