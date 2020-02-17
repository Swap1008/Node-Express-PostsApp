const express = require("express");
const router = express.Router();
const connection = require("../config/dbconfig");
let post = {
  title: "",
  author: "",
  body: "",
  posted_on:"",
  modified_on:""
};

let message = "";

// View All Posts
router.get("/api/posts/viewPosts", (req, res) => {
   
    let posts = {};
    connection.query("SELECT * FROM posts", (err, result) => {
      if (err) {
        message = err;
      } else {
        posts = result;
      }
      
      res.json(posts);
    });
  });

  module.exports=router;