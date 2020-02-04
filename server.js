const express = require('express');
var path = require('path');
var hbs = require('express-handlebars');
var routes = require('./routes');
const app = express();

// Setup

/* Mongoose Connection */
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/reddit-db",
  { useNewUrlParser: true }
);
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set("debug", true);

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// view engine Setup
app.engine('hbs', hbs({extname: 'hbs',
              defaultLayout: 'layout',
              layoutsDir: __dirname + '/views/layouts/',
              partialsDir: __dirname + '/views/partials/',
              }));
app.set('views', path.join(__dirname, 'views/layouts'));
app.set('view engine', 'hbs')

require('./controllers/posts.js')(app);
require('./data/reddit-db');


// app.use(app.router); // **this line will be removed**


// Routes
app.get('/', (req, res) => {
  res.render("posts-index.hbs");
})


// app.get('/posts/new', (req, res) => {
// 
//   res.render("post-new.hbs");
// })


app.get('/post/new', (req, res) => {

  res.render("post-new.hbs");
})






const port = 7000;
app.listen(port, () => console.log(`Reddit app listening on port ${port}!`))