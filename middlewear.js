var fs = require('fs');
var path = require('path');

var urlCheck = function (req, res, next) {
    console.log("Current URL is ", req.url);
    next();
}

module.exports.urlCheck = urlCheck;

var test = function (req, res, next) {
    console.log("Test");
    next();
}

module.exports.test = test;


var responseHeader = function (req, res, next) {
    console.log("calling responseHeader function")

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
}

module.exports.responseHeader = responseHeader;


var staticPath = function (req, res, next) {
    console.log(staticPath);
    if (req.url === "/") {
        fs.readFile("./public/index.html", "UTF-8", function (err, html) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
    } else if (req.url.match("\.css$")) {
        var cssPath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, { "Content-Type": "text/css" });
        fileStream.pipe(res);

    } else if (req.url.match("\.jpg$")) {
        var imagePath = path.join(__dirname, 'public', req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, { "Content-Type": "image/jpg" });
        fileStream.pipe(res);
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("No Page Found");
    }

}
module.exports.staticPath = staticPath;