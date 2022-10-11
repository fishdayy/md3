const http = require('http');
const fs = require('fs');
let formidable = require('formidable');

let output = [];

let server = http.createServer(function (req, res) {
        if (req.method === 'GET') {
            fs.readFile('./views/read-number.html', function (err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
        }else {
            let number = new formidable.IncomingForm();
            number.parse(req,function (err, fields) {
                let inputNumber = {number: fields.number}
                inputNumber = parseInt(inputNumber.number)
                if (err){
                    console.error(err.message);
                    return res.end(err.message);
                }

                switch (inputNumber){
                    case 1:
                        output.push(inputNumber);
                        console.log(output)
                        return res.end('one');
                    case 2:
                        output.push(inputNumber);
                        console.log(output)
                        return  res.end('two');
                    case 3:
                        output.push(inputNumber);
                        console.log(output)
                        return res.end('three');
                    case 4:
                        output.push(inputNumber);
                        console.log(output)
                        return res.end('four');
                    case 5:
                        output.push(inputNumber);
                        console.log(output)
                        return  res.end('five');
                    case 6:
                        output.push(inputNumber);
                        console.log(output)
                        return  res.end('six');
                    case 7:
                        output.push(inputNumber);
                        console.log(output)
                        return  res.end('seven');
                    case 8:
                        output.push(inputNumber);
                        console.log(output)
                        return  res.end('eight');
                    case 9:
                        output.push(inputNumber);
                        console.log(output)
                        return  res.end('night');
                    case 10:
                        output.push(inputNumber);
                        console.log(output)
                        return res.end('ten');
                }
            })
        }
    }
)
server.listen(8080, function () {
    console.log('server running at localhost:8080 ')
});