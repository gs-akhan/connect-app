var connect = require('connect'),
	app 	= connect();

//#1 middleware to Log requests.
//You need to call next() because the control in then moved to exceute another middleware
//Else the /home will never be excuted.

//Adding connect logger middleware

app.use(connect.logger());
app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

app.use('/home', function(req, res, next) {
	res.writeHead(200, {
		"Content-Type" : "text/html"
	})
	res.end('<h1>Hello world, this is your home</h1>');
});

app.listen(4000, function() {
	console.info('App running on port 127.0.0.1:4000');
});