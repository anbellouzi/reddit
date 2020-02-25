const Post = require('../models/post');
const User = require("../models/user");

module.exports = (app) => {

  app.get("/", (req, res) => {
    var currentUser = req.user;
  
    Post.find({})
      .then(posts => {
        res.render("posts-index", { posts, currentUser });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit })
    .then(posts => {
      res.render("posts-index", { posts });
    })
    .catch(err => {
      console.log(err);
    });
  });

  // CREATE
  app.post("/post/new", (req, res) => {
    if (req.user) {
      var post = new Post(req.body);

      post.save(function(err, post) {
        return res.redirect(`/`);
      });
    } else {
      return res.status(401); // UNAUTHORIZED
    }
  });

  app.get("/posts/:id", function(req, res) {
    var id = req.params.id
    // LOOK UP THE POST
    if (id.match(/^[0-9a-fA-F]{24}$/)) {

      // LOOK UP THE POST
      Post.findById(req.params.id).populate('comments').then((post) => {
        res.render('posts-show', { post })
      }).catch((err) => {
        console.log(err.message)
      })
    }
  });

  // SIGN UP POST
  app.post("/sign-up", (req, res) => {

    // Create User
    const user = new User(req.body);

    user
      .save()
      .then(user => {
        res.redirect("/");
      })
      .catch(err => {
        console.log(err.message);
      });
  });

};
