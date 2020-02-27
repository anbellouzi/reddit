// test/posts.js
const app = require("./../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const agent = chai.request.agent(app);


// Import the Post model from our models folder so we
// we can use it in our tests.
const Post = require('../models/post');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Posts', function() {
  const agent = chai.request.agent(server);
  // Post that we'll use for testing purposes
  const newPost = {
    title: 'post title',
    url: 'https://www.google.com',
    summary: 'post summary'
  };

  const user = {
    username: 'poststest',
    password: 'testposts'
  };

  before(function (done) {
    agent
      .post('/sign-up')
      .set("content-type", "application/x-www-form-urlencoded")
      .send(user)
      .then(function (res) {
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  after(function (done) {
    Post.findOneAndDelete(newPost)
    .then(function (res) {
        agent.close()
  
        User.findOneAndDelete({
            username: user.username
        })
          .then(function (res) {
              done()
          })
          .catch(function (err) {
              done(err);
          });
    })
    .catch(function (err) {
        done(err);
    });
  });

});
