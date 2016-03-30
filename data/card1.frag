//card1.frag: fragment shader for the swiss cheese card.

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

void main() { 
  vec4 diffuse_color = vec4 (0.0, 1.0, 1.0, 1.0);

  float distFromCircle = 1000;

  for(int down = 0; down < 3; down++)
  {
    for(int across = 0; across < 3; across++)
    {
        float circleX = .2 + .3 * across;
        float circleY = .2 + .3 * down;

        float deltaX = circleX - vertTexCoord.x;
        float deltaY = circleY - vertTexCoord.y;
        distFromCircle = min(sqrt(deltaX * deltaX + deltaY * deltaY), distFromCircle);
    }
  }

  float alpha = (distFromCircle > .1) ? 0.8 : 0.0;

  float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
  gl_FragColor = vec4(diffuse * diffuse_color.rgb, alpha);

  //your code here
}
