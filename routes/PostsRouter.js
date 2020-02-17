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
router.get("/api/addPosts", (req, res) => {
  res.render("posts/addPosts.ejs", {
    title:'Add Post',
    message: message
  });
});

// Add New Posts
router.post("/api/addPosts", (req, res) => {
  let date=new Date();
  post.title = req.body.title;
  post.author = req.body.author;
  post.body = req.body.body;
  post.posted_on=`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  post.modified_on=`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

  connection.query("INSERT INTO posts set ?", post, (err, res) => {
    if (err) {
      console.error(err);
      message = err;
    } else {
      message = "Post Added Successfully ..!!";
    }
  });
  res.redirect("/api/addPosts");
});

// View All Posts
router.get("/api/viewPosts", (req, res) => {
  let posts = {};
  connection.query("SELECT * FROM posts", (err, result) => {
    if (err) {
      message = err;
    } else {
      posts = result;
    }
    
    res.render("posts/viewPosts", {
      title:'Post',
      posts: posts
    });
  });
});

// Edit Post
router.get("/api/editPost/(:id)", (req, res) => {
  let post = {};
  connection.query(
    `SELECT * FROM posts where id=${req.params.id}`,
    (err, result) => {
      if (err) {
        message = err;
      } else {
        post = result;
      }
      res.render("posts/editPost", {
        title:'Edit Post',
        post: post,
        message: ""
      });
    }
  );
});

// Update a Post
router.post("/api/editPost/:id", (req, res) => {
  post = {
    title: req.body.title,
    author: req.body.author,
    body: req.body.body
  };

  connection.query(
    `UPDATE posts set ? where id=${req.params.id}`,
    post,
    (err, result) => {
      if (err) {
        message = err;
      } else {
        res.redirect("/api/viewPosts");
      }
    }
  );
});

// Delete Post
router.get("/api/deletePost/:id", (req, res) => {
  connection.query(
    `DELETE from posts where id=${req.params.id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        message = "Post Deleted Successfully !!";
      }
      res.redirect("/api/viewPosts");
    }
  );
});

// Read Single Post
router.get("/api/readPost/:id", (req, res) => {
  let post = {};
  let comment = {};
  connection.query(
    `SELECT * FROM posts where id=${req.params.id} `,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        post = result;
      }
      // console.log(post);
      res.render("posts/readPost", {
        title:'Read Post',
        post: post
      });
    }
  );
});

// Comment
router.post("/api/post/comment/:id", (req, res) => {
  const comment = {
    comment: req.body.comment,
    post_id: req.params.id
  };
  connection.query("INSERT into comments set ?", comment, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      message = "Comment Saved";
    }
  });
  res.redirect(`/api/readPost/${req.params.id}`);
});

// Read Comments
router.get("/api/readComments/:id", (req, res) => {
  let comment = {};
  connection.query(
    `SELECT * FROM comments where post_id=${req.params.id}`,
    async (err, result) => {
      if (err) {
        console.log(err);
      } else {
        comment = await result;
      }
      return res.send(comment);
    }
  );
});

module.exports = router;
