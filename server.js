var express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req,res,next) =>{
	var now= new Date().toString();
	var log=`${now}: ${req.method} ${req.url} ${req.path} ${req.ip} ${req.protocol} ${req.params}`;
	
	console.log(log);
	fs.appendFile('server.log', log+ '\n');
	next();
});
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});
app.get('/', (req,res)=>{
	res.render('home.hbs',{
		pageTitle: 'Home Page',
		WelcomeMessage: 'Welcome to my website',
		currentYear: new Date().getFullYear()
	});
});
app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		pageTitle: 'about Page',
		currentYear: new Date().getFullYear()
});
});


app.listen(3000);