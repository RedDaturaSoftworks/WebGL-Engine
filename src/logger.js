function impl_log(message) 
{
	"use strict";
	var console = document.getElementById('overlay-console');
	var mesg = document.createElement('p');
	mesg.setAttribute('id', "conlog");
	mesg.innerHTML = '[LOG] ' + message;
	console.appendChild(mesg);
	console.scrollTop = console.scrollHeight;
}

function impl_warn(message) 
{
	"use strict";
	var console = document.getElementById('overlay-console');
	var mesg = document.createElement('p');
	mesg.setAttribute('id', "conwarn");
	mesg.innerHTML = '[WARN] ' + message;
	console.appendChild(mesg);
	console.scrollTop = console.scrollHeight;
}

function impl_error(severity, message) 
{
	"use strict";
	var console = document.getElementById('overlay-console');
	var mesg = document.createElement('p');
	mesg.setAttribute('id', "conerr");
	mesg.innerHTML = '[ERR] ' + message;
	console.appendChild(mesg);
	console.scrollTop = console.scrollHeight;
}

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) 
{
	var console = document.getElementById('overlay-console');
	var mesg = document.createElement('p');
	mesg.setAttribute('id', "conerr");
	mesg.innerHTML = 
	'[JS ERROR] ' +  errorMsg 
	+ '</br>Script: ' + url.split('/').pop()
	+ '</br>Line: ' + lineNumber  
	+ '</br>Column: ' + column 
	+ '</br>StackTrace: ' +  errorObj;
	console.appendChild(mesg);
	console.scrollTop = console.scrollHeight;
}

module.exports = 
{ 
	log: impl_log,
	warn: impl_warn,
	error: impl_error
};