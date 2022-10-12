const http = require('http')
const fs = require('fs')
const qs = require('qs')
const url = require("url");


let server = http.createServer(function (req, res) {
    let parseUrl = url.parse(req.url, true);
    let path = parseUrl.pathname;
    let trimPath = path.replace(/^\/+|\/+$/g, '');
    let chosenHandler = (typeof (router[trimPath]) !== 'undefined') ? router[trimPath] : handler.notFound;
    chosenHandler(req, res);
})

server.listen('8080', function () {
    console.log('Serve running port 8080')
})

let handler = {};
let data = '';
let html = '';

handler.create = function (rep, res) {
    if (rep.method === 'GET') {
        fs.readFile('./templates/create.html', 'utf8', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end()
        })
    } else {
        rep.on('data', chunk => {
            data += chunk;
        })
        rep.on('end', () => {
            fs.readFile('./data/data.txt', 'utf8', (err, readData) => {
                if (err) console.log(err)
                readData = JSON.parse(readData)
                readData.push(qs.parse(data))
                const writeData = JSON.stringify(readData)
                fs.writeFile('./data/data.txt', (writeData), err => {
                    if (err) {
                        console.log(err.message)
                        return
                    }
                    return res.end('Create success')
                })
            })
        })
        rep.on('error', () => {
            console.log('error')
        })
    }
}

handler.product = function (rep, res) {
    if (rep.method === 'GET') {
        fs.readFile('./data/data.txt', 'utf8', function (err, str) {
            readData = JSON.parse(str);
            readData.forEach((value) => {
                html += '<tr>';
                html += `<td>${value.id}</td>`
                html += `<td>${value.name}</td>`
                html += `<td>${value.price}</td>`
                html += `<td><button class="btn btn-danger">Delete</button></td>`
                html += `<td><button class="btn btn-outline-primary">Edit</button></td>`
                html += '</tr>';
            })
            fs.readFile('./templates/product.html', 'utf8', function (err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                data = data.replace('{list-product}', html)
                res.write(data)
                res.end()
            });
        })
    }
}

handler.notFound = function (rep, res) {
    fs.readFile('./templates/notfound.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
};


let router = {
    'create': handler.create,
    'product': handler.product,
}







