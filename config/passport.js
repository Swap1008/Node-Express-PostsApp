const LocalStrategy=require('passport-local').Strategy;

const bcrypt=require('bcrypt');
const connection=require('./dbconfig');

module.exports=function(passport){

    // Sign-Up
    passport.use('local-signup',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },function(req,fname,email,password,done){
        connection.query(`SELECT * FROM users WHERE emailid=${email}`,function(err,rows){
            if (err) {
                return done(err);
            }

            if (rows.length) {
                return done(null,false,req.flash('signUpMessage','Email Already Registered'));
            }else{
                let newUser=new Object();
                newUser.emailid=email;
                newUser.password=password;
                newUser.fname=fname;

                connection.query(`INSERT INTO users set ?`,newUser,(err,result)=>{
                    if (err) {
                        throw err;
                    }

                    newUser.id=result.id;
                    return done(null,newUser);
                });
            }


        });
    }));

    // Login
    passport.use('local-login',new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    },function(req,email,password,done){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(password,salt,(err,hash)=>{
                if (err) {
                    throw err;
                }
                password=hash;
            });
        })
        connection.query(`select * from users where email=${email}`,(err,rows)=>{
            console.log("Query Execution Block");
            if (err) {
                return done(err);
            }
            if (!rows.length) {
                console.log("rows length block");
                return done(null,false,req.flash('loginMessage','No User Foun'));
            }

            
                bcrypt.compare(rows[0].password,password,(err,isMatch)=>{
                    console.log("Bcrypt Compare Block");
                    if (err) {
                        throw err;
                    }
                    if (!isMatch) {
                        console.log("is Matched if block");
                        return done(null,false,req.flash('loginMessage','Incorrect Password'));
                        
                    }
                })
            
            return done(null,rows[0]);
        })
    }));

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log("Serialize block");
		done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log("De-Serialize block");
		connection.query("select * from users where id = "+id,function(err,rows){	
			done(err, rows[0]);
		});
    });
};