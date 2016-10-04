var path    = require("path"),
	express = require('express'),
	app     = express();

app.set('views', path.join(__dirname, '.'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', function(req, res) {
	res.render('simple');
});

app.get('/testjsonp', function (req, res) {
	var obj = {
		result: 'jsonp return success'
	};

	res.jsonp(obj);
});

app.listen(3000);
