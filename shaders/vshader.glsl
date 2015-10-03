attribute vec2 position;
attribute vec3 color;  
varying vec3 vColor;

void main(void) 
{
	gl_Position = vec4(position, 0., 1.);
	vColor=color;
}