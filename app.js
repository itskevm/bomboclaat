var express = require("express")
var port = process.env.PORT || 3000;
var homeController = require('./controllers/home');
var acontroller = require('./controllers/1cont');

var app = express();

// what am i looking up and where am i finding it?
app.set("views", "views");
// what type of view engine?
app.set('view engine', 'ejs');

// where are static files going to be found?
app.use(express.static("./public"));

// what happens when the root directory is accessed?
homeController(app);

//acontroller(app);

app.listen(port, function () {
    console.log("The server is listening to port !");
});