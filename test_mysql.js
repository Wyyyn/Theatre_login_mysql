/**
 * Created by wyn on 17-12-3.
 */
var mysql =require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'new_reading'
});
connection.connect();

connection.query('SELECT * FROM UserTable',function (error,rows) {
    if(error)throw error;
    console.log('select =>')
    for(var i in rows){
        console.log(rows[i]);
    }
    
});
connection.end();