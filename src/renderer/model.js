/* global gl */
var glMatrix = require('gl-matrix');
var Shader = require('./shader');

function Model()
{
	"use strict";
	this.vertexArray = [];
	this.indexArray = [];
	
	this.vertexBuffer = 0;
	this.indexBuffer = 0;
	
	this.vertexShader = 0;
	this.pixelShader = 0;
	this.shaderProgram = gl.createProgram();
	
	//To be moved
	this.projmat = glMatrix.mat4.create();
	this.viewmat = glMatrix.mat4.create();
	this.modelmat = glMatrix.mat4.create();
}

Model.prototype.AddVertices = function(vertices)
{
	"use strict";
	this.vertexBuffer = gl.createBuffer();
	this.vertexArray = vertices;
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexArray), gl.STATIC_DRAW);
};

Model.prototype.AddIndices = function(indices)
{
	"use strict";
	this.indexBuffer = gl.createBuffer();
	this.indexArray = indices;
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexArray), gl.STATIC_DRAW);
};

Model.prototype.VSSetShader = function(vshader)
{
	"use strict";
	this.vertexShader = Shader.GetShader(vshader, gl.VERTEX_SHADER, "VERTEX");
	gl.attachShader(this.shaderProgram, this.vertexShader);
	if(this.pixelShader !== 0)
	{
		gl.linkProgram(this.shaderProgram);
	}
};

Model.prototype.PSSetShader = function(pshader)
{
	"use strict";
	this.pixelShader = Shader.GetShader(pshader, gl.FRAGMENT_SHADER, "FRAGMENT");
	gl.attachShader(this.shaderProgram, this.pixelShader);
	if(this.vertexShader !== 0)
	{
		gl.linkProgram(this.shaderProgram);
	}
};

Model.prototype.Render = function()
{
	"use strict";
	gl.useProgram(this.shaderProgram);
		
	var _Pmatrix = gl.getUniformLocation(this.shaderProgram, "projmat");
    var _Vmatrix = gl.getUniformLocation(this.shaderProgram, "viewmat");
    var _Mmatrix = gl.getUniformLocation(this.shaderProgram, "modelmat");
	
	var _color = gl.getAttribLocation(this.shaderProgram, "uv");
	var _position = gl.getAttribLocation(this.shaderProgram, "position");
	
	gl.enableVertexAttribArray(_color);
    gl.enableVertexAttribArray(_position);

	gl.uniformMatrix4fv(_Pmatrix, false, this.projmat);
	gl.uniformMatrix4fv(_Mmatrix, false, this.modelmat);
	gl.uniformMatrix4fv(_Vmatrix, false, this.viewmat);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
	
	gl.vertexAttribPointer(_position, 3, gl.FLOAT, false, 4 * (3 + 2), 0);
    gl.vertexAttribPointer(_color, 2, gl.FLOAT, false, 4 * (3 + 2), 2 * 4);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	
	gl.drawElements(gl.TRIANGLES, this.indexArray.length, gl.UNSIGNED_SHORT, 0);
	gl.flush();
};

///////To be moved
Model.prototype.SetProjmatrix = function(projmat)
{
	"use strict";
	this.projmat = projmat;
};

Model.prototype.SetViewmatrix = function(viewmat)
{
	"use strict";
	this.viewmat = viewmat;
};

Model.prototype.SetModelmatrix = function(modelmat)
{
	"use strict";
	this.modelmat = modelmat;
};
//////////////////

module.exports = 
{ 
	Model: Model,
	Render : Model.prototype.Render
};
