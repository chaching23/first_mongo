var session = require('express-session');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const flash = require('express-flash');
app.use(flash());

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');



app.get('/', function(req, res) {
    res.render('index');
})



mongoose.connect('mongodb://localhost/basic_mongoose');
var UserSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 6 },
    age: { type: String, required: true, maxlength: 20 }
  }, {timestamps: true});

   mongoose.model('User', UserSchema); 
   var User = mongoose.model('User') 
   





  
app.get('/view', function(request, response) {
User.find({}, function(err, x){

  response.render('view', {users: x});

})
})



app.post('/users', function(req, res) {
    var user = new User({name: req.body.name, age: req.body.age});
    user.save(function(err) {
      if(err){
        // if there is an error upon saving, use console.log to see what is in the err object 
        console.log("We have an error!", err);
        // adjust the code below as needed to create a flash message with the tag and content you would like
        for(var key in err.errors){
            req.flash('registration', err.errors[key].message);
        }
        // redirect the user to an appropriate route
        res.redirect('/');
    }
    else {
        res.redirect('/view');
    }
  });
});


app.listen(8000, function() {
    console.log("listening on port 8000");
})
