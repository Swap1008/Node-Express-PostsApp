const mysql=require('mysql');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'postsdb'
});

connection.connect((err)=>{
    if (err) {
        console.log(err);
    }
})


module.exports=connection;