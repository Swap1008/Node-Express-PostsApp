// Imports
const express=require('express');
const app=express();
const bodyParser=require('body-parser');

const indexRoute=require('./routes/index');
const postRoute=require('./routes/PostsRouter');
const userRoute=require('./routes/UserRoute');
const postApiRoute=require('./routes/PostsAPIRoutes');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cors=require('cors');

// Passport Config
require('./config/passport')(passport);

//View Engine
app.set('view engine','ejs');

// Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());
// 
// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Routes
app.use(indexRoute);
app.use(postRoute);
app.use(userRoute);
app.use(postApiRoute);




// Server
app.listen(4000,(err)=>{
    if (err) {
        console.log(err);
    } else {
        console.log("Server Started");
    }
});

