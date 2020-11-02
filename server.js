var express = require("express");
var app = express();
const urlCheck = require('./middlewear').urlCheck;
const test = require('./middlewear').test;
const responseHeader = require('./middlewear').responseHeader;
const router = express.Router();
var path = require("path");
var fs = require("fs");
var http = require("http").createServer(app);
var io = require("socket.io")(http);
//var staticPath = require('./middlewear').staticPath;


//for all req
app.use(urlCheck);
app.use(test);

app.use('/', router);
//third option
// Add headers
app.use(responseHeader);
//app.use(staticPath);
app.use(express.static('public'))


app.get('/', function (req, res) {
    console.log('home page');
    //res.send('home page');
    res.sendFile(__dirname + "/view/index.html");


});

app.get('/admin', function (req, res) {
    console.log('contact page');
    //res.send('home page');
    res.sendFile(__dirname + "/view/contact.html");
});

app.get('/portfolio', function (req, res) {
    console.log('contact page');
    //res.send('home page');
    res.sendFile(__dirname + "/view/portfolio.html");
});

app.get('/posted', function (req, res) {
    console.log('contact page');
    //res.send('home page');
    res.sendFile(__dirname + "/view/posted.html");
});

app.post('/post', function (req, res) {
    console.log('contact page');
    //res.send('home page');
    res.sendFile(__dirname + "/view/post.html");
});

io.on("connection", function (socket) {
    console.log("User" + socket.id);
    socket.on("messageSent", function (message) {
        console.log(message);
        socket.broadcast.emit("messageSent", message);
    });
})


app.use(function (req, res, next) {
    res.status(404).send('Sorry cant find that!');
});


let port = process.env.PORT || 3000

http.listen(port, function (req, res, ) {
    console.log("Server connected");

})

