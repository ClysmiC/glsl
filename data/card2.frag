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

  //different colors for which iteration it misses on :)
  vec4 missColor1_5 = vec4(0.0, 1.0, 0.0, 1.0);   //iteration 1-5
  vec4 missColor6_10 = vec4(1.0, 0.0, 0.0, 1.0);  //iteration 6-10
  vec4 missColor11_15 = vec4(0.0, 0.0, 1.0, 1.0); //etc.
  vec4 missColor16_20 = vec4(0.0, 1.0, 1.0, 1.0);

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

  for (int i = 1; i <= 20; i++)
  {
    z = mandelbrotIterate(z, c);

    if (length(z) > 2.0)
    {
      if (i <= 5)
      {
        finalColor = missColor1_5;  
      }
      else if (i <= 10)
      {
        finalColor = missColor6_10;
      }
      else if (i <= 15)
      {
        finalColor = missColor11_15;
      }
      else
      {
        finalColor = missColor16_20;
      }
      
      break;
    }
  }

  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  gl_FragColor = vec4(diffuse * finalColor.rgb, 1.0); 
}