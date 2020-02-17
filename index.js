// Imports
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const path=require('path');
const indexRoute=require('./routes/index');
const postRoute=require('./routes/PostsRouter');
const userRoute=require('./routes/UserRoute');

//View Engine
app.set('view engine','ejs');

// Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(indexRoute);
app.use(express.static('public'));
app.use(postRoute);
app.use(userRoute);
// Routes




// Server
app.listen(4000,(err)=>{
    if (err) {
        console.log(err);
    } else {
        console.log("Server Started");
    }
});

