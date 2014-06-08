var connect = require('connect'),
	app 	= connect();

//#1 middleware to Log requests.
//You need to call next() because the control in then moved to exceute another middleware
//Else the /home will never be excuted.

//Adding connect logger middleware

app.use(connect.cookieParser('mysecretkey'));
app.use(function(req, res, next) {
	next();
});


app.use(connect.session());
app.use('/home', function(req, res, next) {
	
	var sess = req.session;
	res.writeHead(200, {
			"Content-Type" : "text/html",
	});
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