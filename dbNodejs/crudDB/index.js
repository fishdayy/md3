const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'dbTest',
    charset: 'utf8_general_ci'
});

connection.connect(function (err) {
    if (err) {
        throw err.stack;
    }
    else {
        console.log("connect success");
        const sqlInsert = "INSERT INTO customer (name, address) VALUES ('Ngô Ngọc Bằng', 'Hà Nội')";
        connection.query(sqlInsert, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

        const sqlUpdate = "UPDATE customer SET address = 'Hải Dương' WHERE name = 'hung'";
        connection.query(sqlUpdate, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
        });
    }
});