attribute vec3 position;

uniform mat4 projmat;
uniform mat4 viewmat;
uniform mat4 modelmat;

attribute vec2 uv;
varying vec2 vuv;

void main(void) 
{
	gl_Position = projmat * viewmat * modelmat * vec4(position, 1.);
	vuv=uv;
}