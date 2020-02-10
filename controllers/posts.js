const Post = require('../models/post');

module.exports = (app) => {

  app.get('/', (req, res) => {

    Post.find({})
    .then(posts => {
      res.render("posts-index", { posts });
    })
    .catch(err => {
      console.log(err.message);
    });

  })

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
  app.post('/post/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
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

};
