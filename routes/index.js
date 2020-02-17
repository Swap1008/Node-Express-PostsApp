const express=require('express');
const router=express.Router();
const connection=require('../config/dbconfig');


router.get('/',(req,res)=>{
    let posts={};
    connection.query("SELECT * FROM posts",(err,results)=>{
        if (err) {
            console.log(err);
        } else {
            posts=results;
        }
        
        res.render('index.ejs',{
            title:"Index",
            posts:posts
        });
    })


});


module.exports=router;