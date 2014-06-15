var express = require('express'),
	connect = require('connect');


var app = express();
app.use(connect.cookieParser('mysecretkey'));
app.use(function(req, res, next) {
	next();
});


//addingd static middleware
app.use(connect.directory('public', {icons:true}));
app.use(connect.static(__dirname+'/public'));
app.use(connect.session());

app.get('/home', function(req, res, next) {
	
	var sess = req.session;
	res.statusCode = 200;
	res.setHeader('Content-Type','text/html');
	res.setHeader('Set-Cookie', "name=khan");
	if(!sess.views) {
		sess.views = 1;
		sess.name = " Mr.Connect ";
		res.end('<h1>Hello world, this is your home</h1>');
		
	}
	else {
		res.end('<h1>Hello '+sess.name+', this is your home '+ req.session.views+'</h1>');	
		sess.views++;	
	}
});

//Middleware for error handlers
app.use(errorHandler());

app.listen(4000, function() {
	console.info('App running on port 127.0.0.1:4000');
});

function errorHandler() {

	return function (err, req, res, next) {
		res.statusCode = 500;
		res.end("<h1>Internal Server Error</h1>");
	};

};