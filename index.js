var connect = require('connect'),
	app 	= connect();

//#1 middleware to Log requests.
//You need to call next() because the control in then moved to exceute another middleware
//Else the /home will never be excuted.

//Adding connect logger middleware

//Logger to log the requests
app.use(connect.logger());

app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

app.use(connect.cookieParser('keyboard cat'));
app.use(connect.session());
app.use('/home', function(req, res, next) {
	var sess = req.session;
	res.writeHead(200, {
			"Content-Type" : "text/html"
	});
	if(sess.views) {
		sess.views = 0;
		res.end('<h1>Hello world, this is your home</h1>');
	}
	else {
		sess.views ++;
		res.end('<h1>Hello world, this is your home '+ req.session.views+'</h1>');	
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