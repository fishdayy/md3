const http = require('http')
const fs = require('fs')
const qs = require('qs')
const url = require("url");


let server = http.createServer(function (req, res) {
    let parseUrl = url.parse(req.url, true);
    let path = parseUrl.pathname;
    let arrPath = path.split('/');
    let trimPath = arrPath[1];
    let chosenHandler;
    if (typeof router[trimPath] === "undefined") {
        chosenHandler = handler.notFound;
    } else {
        chosenHandler = router[trimPath];
    }
    chosenHandler(req, res, arrPath[2]);
})

server.listen('8080', function () {
    console.log('Serve running port 8080')
})

let handler = {};
let data = '';

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
                    data = ''
                    return res.end('Create success')
                })
            })
        })
        rep.on('error', () => {
            console.log('error')
        })
    }
}

handler.edit = function (rep, res) {
    const index = rep.url.slice(1).split('/')[1]
    if (rep.method === 'GET') {
        fs.readFile('./templates/edit.html', 'utf8', (err, data) => {
            res.writeHead(200, "text/html");
            res.write(data);
            res.end();
        });
    }else {
        rep.on('data', chunk => {
            data += chunk;
        });
        rep.on('end', () => {
            fs.readFile('./data/data.txt', 'utf8', (err, readData) => {
                if (err) console.log(err)
                readData = JSON.parse(readData);
                for (let i = 0; i < readData.length; i++) {
                    if(i === +index){
                        readData[i] = qs.parse(data);
                    }
                }
                data = JSON.stringify(readData);
                fs.writeFile('./data/data.txt', data, err => {
                    if (err) console.log(err);
                    return res.end('Edit success')
                });

            })
        })
        res.writeHead(301, {'location': '/product'});
        res.end();
    }
}

handler.delete = function (rep,res){
    const index = rep.url.slice(1).split('/')[1]
    if (rep.method === 'GET') {
        fs.readFile('./templates/delete.html', 'utf8', (err, data) => {
            res.writeHead(200, "text/html");
            res.write(data);
            res.end();
        });
    }else {
        rep.on('data', chunk => {
            data += chunk;
        });
        rep.on('end', () => {
            fs.readFile('./data/data.txt', 'utf8', (err, readData) => {
                if (err) console.log(err)
                readData = JSON.parse(readData);
                readData.splice(index,1)
                const writeData = JSON.stringify(readData)
                fs.writeFile('./data/data.txt', writeData, err => {
                    if (err) console.log(err);
                    return res.end('delete success')
                });

            })
        })
        res.writeHead(301, {'location': '/product'});
        res.end();
    }
}

handler.product = function (rep, res) {
    let html = '';
    if (rep.method === 'GET') {
        fs.readFile('./data/data.txt', 'utf8', function (err, str) {
            let readData = JSON.parse(str);

            readData.forEach((value, index) => {
                html += '<tr>';
                html += `<td>${index + 1}</td>`
                html += `<td>${value.name}</td>`
                html += `<td>${value.price}</td>`
                html += `<td><button class="btn btn-danger"><a href="delete/${index}">Delete</a></button></td>`
                html += `<td><button class="btn btn-outline-primary"><a href="edit/${index}">Edit</a></button></td>`
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
    'edit': handler.edit,
    'delete': handler.delete,
    'product': handler.product,
}







