/* global CANVAS */
/* global CreateGLContext */
/* global gl */

var glslify = require('glslify');
var Logger = require('./logger');
var glMatrix = require('gl-matrix');
var Model = require('./renderer/model');
var GeometryGenerator = require('./renderer/geometrygenerator');
var Stats = require('stats-js');

var stats = new Stats();

var main = function() 
{
	stats.setMode(0); // 0: fps, 1: ms 
 
	// Align top-left 
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '50%';
	stats.domElement.style.top = '0px';
	document.body.appendChild( stats.domElement );
	
	CreateGLContext();

	var model = new Model.Model();

	model.VSSetShader(glslify('../shaders/vshader.glsl'));
	model.PSSetShader(glslify('../shaders/pshader.glsl'));

	var modeldata = GeometryGenerator.GenerateCube();


	model.AddVertices(modeldata.vertices);
	model.AddIndices(modeldata.indices);


	var projmat = glMatrix.mat4.create();
	var modelmat = glMatrix.mat4.create();
	var VIEWMATRIX=glMatrix.mat4.create();

	glMatrix.mat4.perspective(projmat, 20, CANVAS.width/CANVAS.height, 0.1, 100);
	glMatrix.mat4.identity(modelmat); // Set to identity

	glMatrix.mat4.identity(VIEWMATRIX); // Set to identity
	glMatrix.mat4.translate(VIEWMATRIX, VIEWMATRIX, [0, 0, -5]); // Translate back 10 units

	model.SetProjmatrix(projmat);
	model.SetViewmatrix(VIEWMATRIX);

	var time_old=0;

	var animate=function(time) 
	{
		stats.begin();
		var dt = time-time_old;
		time_old=time;

		glMatrix.mat4.rotate(modelmat, modelmat, dt * 0.001, [0, 0, 1]); // Rotate 90 degrees around the Y axis
		glMatrix.mat4.rotate(modelmat, modelmat, dt * 0.002, [1, 0, 0]); // Rotate 90 degrees around the Y axis
		glMatrix.mat4.rotate(modelmat, modelmat, dt * 0.003, [0, 1, 0]); // Rotate 90 degrees around the Y axis

		gl.viewport(0.0, 0.0, CANVAS.width, CANVAS.height);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		
		model.SetModelmatrix(modelmat);
		model.Render();
	
		stats.end();
		
		window.requestAnimationFrame(animate);
	};
	animate(0);
};

window.onload = function() 
{
	main();
};

