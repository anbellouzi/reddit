const Post = require('../models/post');

module.exports = (app) => {

  // CREATE
  app.post('/posts/new', (req, res) => {
    Post.find({})
    .then(posts => {
      res.render("posts-index", { posts });
    })
    .catch(err => {
      console.log(err.message);
    });
  });

};
