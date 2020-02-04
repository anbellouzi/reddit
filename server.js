const express = require('express');
var path = require('path');
var hbs = require('express-handlebars');


var routes = require('./routes');

const app = express();
// Setup


// view engine Setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')


// app.use(app.router); // **this line will be removed**


// Routes
app.get('/', (req, res) => {

  res.render("layout.hbs");
})




const port = 4000;
app.listen(port, () => console.log(`Reddit app listening on port ${port}!`))
