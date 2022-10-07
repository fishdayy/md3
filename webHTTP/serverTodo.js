const http = require('http');
const fs = require('fs');
const qs = require('qs')

const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('../webHTTP/toDoList/todo.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const userInfo = qs.parse(data);
            fs.readFile('../webHTTP/toDoList/display.html', 'utf8', function (err, dataHTML) {
                if (err) {
                    console.log(err);
                }
                dataHTML = dataHTML.replace('{toDo1}', userInfo.toDo1);
                dataHTML = dataHTML.replace('{toDo2}', userInfo.toDo2);
                dataHTML = dataHTML.replace('{toDo3}', userInfo.toDo3);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(dataHTML);
                return res.end();
            });
        })
        req.on('error', () => {
            console.log('error')
        })
    }
});

server.listen(8080, function () {
    console.log('server running at localhost:8080 ')
});