const http = require('http');
const fs = require('fs');
const qs = require('qs')

const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./calculator/calculator.html', function (err, data) {
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });

    }else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            const number = qs.parse(data);
            fs.readFile('./calculator/result.html', 'utf8', function (err, datahtml) {
                if (err) {
                    console.log(err);
                }
                if (number.select){
                    if (number.select === "plus"){
                        datahtml = datahtml.replace('{result}',Number(number.number1) + Number(number.number2));
                    }
                    if (number.select === "subtraction"){
                        datahtml = datahtml.replace('{result}',Number(number.number1) - Number(number.number2));
                    }
                    if (number.select === "multiplication"){
                        datahtml = datahtml.replace('{result}',Number(number.number1) * Number(number.number2));
                    }
                    if (number.select === "division"){
                        datahtml = datahtml.replace('{result}',Number(number.number1) / Number(number.number2));
                    }
                }

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(datahtml);
                return res.end();
            });
        })

    }
})
server.listen(8080, function () {
    console.log('server running at localhost:8080 ')
});