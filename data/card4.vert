//card4.vert: vertex shader for the mountain card

// Our shader uses both processing's texture and light variables
#define PROCESSING_TEXLIGHT_SHADER

// Set automatically by Processing
uniform mat4 transform;
uniform mat3 normalMatrix;
uniform vec3 lightNormal;
uniform mat4 texMatrix;
uniform sampler2D texture;


// Come from the geometry/material of the object
attribute vec4 vertex;
attribute vec4 color;
attribute vec3 normal;
attribute vec2 texCoord;

// These values will be sent to the fragment shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;
varying vec4 vertTexCoordR;
varying vec4 vertTexCoordL;

void main() {
    float maxDepth = 150.0;

    vertColor = color;
    vertNormal = normalize(normalMatrix * normal);
    vertLightDir = normalize(-lightNormal);
    vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);

    vec4 texColor = texture2D(texture, vertTexCoord.xy);

    //intensity is 0-1
    float intensity = .3 * texColor.r + .6 * texColor.g + .1 * texColor.b;
    intensity = clamp(intensity, 0.0, 1.0);

    vec4 vert = vertex;
    vert += vec4(vertNormal * maxDepth * intensity, 0.0);
    gl_Position = transform * vert;
}