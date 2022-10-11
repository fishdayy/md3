const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

let server = http.createServer(function (req, res) {

    let parseUrl = url.parse(req.url, true);
    let queryStringObject = parseUrl.query;

    res.end('Hello Node Js');
    console.log(queryStringObject);
})

server.listen(3000, function () {
    console.log("the server is listening on port 3000 now ");
})