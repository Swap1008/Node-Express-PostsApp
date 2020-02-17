const express = require("express");
const router = express.Router();
const connection = require("../config/dbconfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { forwardAuthenticated } = require("../config/auth");
let message = "";
let users = {
  fname: "",
  emailid: "",
  password: "",
  status: 1
};

// Users
router.get("/api/users", (req, res) => {
  let user = {};
  connection.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      user = result;

      res.render("users/users", {
        user: user,
        title:'All Users'
      });
    }
  });
});

// Add User
router.get("/api/addUser", (req, res) => {
  res.render("users/addUser", {
    message: message,
    title:'Add Users'
  });
});

router.post("/api/addUser", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  // console.log(hashedPassword)
  users = {
    fname: req.body.fname,
    emailid: req.body.emailid,
    password: hashedPassword
  };

  connection.query("INSERT INTO users set ?", users, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      message = "User added succesfully !!";
    }
  });
  res.redirect("/api/users");
});

// Edit User

router.get("/api/editUser/:id", (req, res) => {
  let user = {};
  connection.query(
    `SELECT * FROM users WHERE id=${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        user = result;
        console.log(user);
      }
      res.render("users/editUser", {
        user: user,
        title:'Edit Users'
      });
    }
  );
});

// Update User Details
router.post("/api/editUser/:id", (req, res) => {
  let user = {
    fname: req.body.fname,
    emailid: req.body.emailid,
    status: req.body.status
  };
  connection.query(
    `UPDATE users set ? where id=${req.params.id}`,
    user,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("User details Updated");
      }
    }
  );
  res.redirect("/api/users");
});

// Delete User
router.get("/api/deleteUser/:id", (req, res) => {
  connection.query(
    `DELETE FROM users where id=${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
  res.redirect("/api/users");
});

// Sign-Up
router.post("/api/signUp", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  users = {
    fname: req.body.fname,
    emailid: req.body.emailid,
    password: hashedPassword
  };
  connection.query("INSERT INTO users set ?", users, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      message = "User Added Successfully";
    }
  });

  res.redirect("/api/users");
});

//Error 
router.get('/api/errors',(req,res)=>{
  res.render('error',{
    title:'Error'
  })
})
// Login

router.post("/api/login", (req, res, next) => {
  passport.authenticate("local-login", {
    successRedirect: "/api/users/dashboard",
    failureRedirect: "/api/errors",
    failureFlash: true
  })(req, res, next);
});

// Dashboard
router.get("/api/users/dashboard", (req, res) => {
  res.render("users/dashboard", {
    title: "Dashboard"
  });
});
// Profile
router.get("/api/users/viewProfile/:id", (req, res) => {
  let user = [];
  connection.query(
    `SELECT * FROM users WHERE id=${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        user = result;
      }
      res.render("users/profile", {
        user: user
      });
    }
  );
});

module.exports = router;
