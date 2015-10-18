precision mediump float;

varying vec2 vuv;

void main(void) 
{
	vec2 uv = vuv;
	//uv -= 0.5;
	//uv /= vec2(9.0 / 16.0, 1.0);
	
	gl_FragColor = vec4(uv, 0.0, 1.0);
}