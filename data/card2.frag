//card2.frag: fragment shader for the mandelbrot card

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

vec2 mandelbrotIterate(vec2 z, vec2 c)
{
  //z: a + bi
  //z^2: a^2 + 2abi - b^2
  vec2 returnVal = vec2(z.x * z.x - z.y * z.y, 2 * z.x * z.y);
  
  return returnVal + c;
}

void main() {
  //hit for inside, miss for outside
  vec4 hitColor = vec4 (1.0, 1.0, 1.0, 1.0); 
  vec4 missColor = vec4 (1.0, 0.0, 0.0, 1.0);

  //x: [-2.1, .9]
  //y: [-1.5, 1.5]
  float cxMin = -2.1;
  float cxRange = 3.0;
  float cyMin = -1.5;
  float cyRange = 3.0;

  vec2 z = vec2(0.0, 0.0);
  vec2 c = vec2(
      cxMin + vertTexCoord.x * cxRange,
      cyMin + vertTexCoord.y * cyRange
      );

  vec4 finalColor = hitColor;

  for(int i = 1; i <= 20; i++)
  {
    z = mandelbrotIterate(z, c);

    if(sqrt(z.x * z.x + z.y * z.y) > 2.0)
    {
      finalColor = missColor;
      break;
    }
  }

  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  gl_FragColor = vec4(diffuse * finalColor.rgb, 1.0); 
}