var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js'); 
app.use(express.static(__dirname + '/public'));
// set up handlebars view engine
var handlebars = require('express3-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/home', function(req, res){
//res.type('text/plain');
//res.send('Meadowlark Travel');
res.render('home');
});
app.use(function(req, res, next){
res.locals.showTests = app.get('env') !== 'production' &&
req.query.test === '1';
next();
});

app.get('/about', function(req, res){
//res.type('text/plain');
//res.send('About Meadowlark Travel');
//res.render('about');
 
res.render('about', { fortune: fortune.getFortune() });

});

// custom 404 page
app.use(function(req, res){
//res.type('text/plain');
res.status(404);
//res.send('404 - Not Found');
res.render('404');
});
// custom 500 page

app.use(function(err, req, res, next){
console.error(err.stack);
//res.type('text/plain');
res.status(500);
//res.send('500 - Server Error  ');
res.render('500');
});

app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
console.log("The environment is ${app.get('env')}");
});