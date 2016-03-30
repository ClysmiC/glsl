//card3.frag fragment shader for the duck card

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D texture;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

float rgbToGray(vec3 rgb)
{
    return .3 * rgb.r + .6 * rgb.g + .1 * rgb.b;
}

void main() { 
    float onePixel = 1.0 / 256.0; //img is 256 x 256
    float scalingFactor = 5.0;

    vec4 myColor = texture2D(texture, vertTexCoord.xy);
    float myGray = rgbToGray(myColor.rgb);

    vec4 northColor = texture2D(texture, vec2(vertTexCoord.x, vertTexCoord.y + onePixel));
    float northGray = rgbToGray(northColor.rgb);

    vec4 eastColor = texture2D(texture, vec2(vertTexCoord.x + onePixel, vertTexCoord.y));
    float eastGray = rgbToGray(eastColor.rgb);

    vec4 southColor = texture2D(texture, vec2(vertTexCoord.x, vertTexCoord.y - onePixel));
    float southGray = rgbToGray(southColor.rgb);

    vec4 westColor = texture2D(texture, vec2(vertTexCoord.x - onePixel, vertTexCoord.y));
    float westGray = rgbToGray(westColor.rgb);

    myGray = clamp(northGray + eastGray + westGray + southGray - (myGray * 4.0), 0.0, 1.0);
    myGray *= scalingFactor;

    float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
    float myRgb = diffuse * myGray;
    gl_FragColor = vec4(myRgb, myRgb, myRgb, 1.0);
}
