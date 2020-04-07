var express = require("express")
const bodyParser = require('body-parser')
var port = process.env.PORT || 3000;
var homeController = require('./controllers/home');
var indexController = require('./controllers/index');
var acontroller = require('./controllers/1cont');

var app = express();

// what am i looking up and where am i finding it?
app.set("views", "views");
// what type of view engine?
app.set('view engine', 'ejs');

// where are static files going to be found?
app.use(express.static("./public"));

app.use(bodyParser.urlencoded({extended: false}));

// what happens when index is accessed? static
//indexController(app);

// what happens when the schedule is accessed?
homeController(app);

app.all('*', function(req, res) {
    throw new Error("Bad request")
})
app.use(function(e, req, res, next) {
    if (e.message === "Bad request") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>404 Error</h1><h3 style="color:red">Page Not Found</h3>');
        res.write('<footer><p><a class="sender" href="/">Home</a> | <a class="sender" href="/">CS 313 Assignments</a> | <a class="sender" href="#cabeza">Return to top</a><br><a href="https://youtube.com/kevm967"><img src="https://i.ibb.co/6vBchr4/2019-LOGO-1.png"alt="KevMGamingLogo" style="vertical-align:middle" width="80" height="80" /></a>KevMGaming © 2020</p></footer>');
        res.end();
    }
});

app.listen(port, function () {
    console.log("The server is listening to port: " + port);
});