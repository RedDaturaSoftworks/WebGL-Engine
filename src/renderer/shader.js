/* global gl */
var Logger = require('../Logger');

function implGetShader(source, type, typeString) 
{
	"use strict";
	//Logger.log(Logger.Severity_Log, source);
	var shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
	{
		Logger.error("ERROR IN " + typeString + " SHADER : " + gl.getShaderInfoLog(shader));
		return false;
	}
	return shader;
}

module.exports =
{
	GetShader : implGetShader
};