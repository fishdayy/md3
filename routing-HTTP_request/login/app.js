let http = require('http');
let url = require('url');
let fs = require('fs');
const qs = require("qs");
let StringDecoder = require('string_decoder').StringDecoder;

let server = http.createServer(function (req, res) {

    let parseUrl = url.parse(req.url, true);

    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handlers.notFound;
    chosenHandler(req, res);
});

//server start
server.listen(3000, function () {
    console.log("the server is listening on port 3000 now ");
})

let handlers = {};

handlers.login = function (rep, res) {
    if (rep.method === 'GET'){
        fs.readFile('./view/login.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    }else {
        let data = '';
        rep.on('data', chunk => {
            data += chunk;
        })
        rep.on('end', () => {
            const userInfo = qs.parse(data);
            fs.readFile('./view/profile.html', 'utf8', function (err, dataHTML) {
                if (err) {
                    console.log(err);
                }
                dataHTML = dataHTML.replace('{username}', userInfo.username);
                dataHTML = dataHTML.replace('{password}', userInfo.password);

                res.statusCode = 302;
                res.setHeader("Location","/profile");
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(dataHTML);
                res.end();
                return res.end();
            });
        })
        rep.on('error', () => {
            console.log('error')
        })
    }
};

handlers.home= function (rep, res) {
   if (rep.method === 'GET'){
       fs.readFile('./view/home.html', function(err, data) {
           res.writeHead(200, {'Content-Type': 'text/html'});
           res.write(data);
           return res.end();
       });
   }else {
       res.statusCode = 302;
       res.setHeader("Location", "/login");
       res.end();
   }

};

handlers.profile= function (rep, res) {
    fs.readFile('./view/profile.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

handlers.notFound = function (rep, res) {
    fs.readFile('./view/notfound.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};

let router = {
    'login': handlers.login,
    'home': handlers.home,
    'profile': handlers.profile,
}