//use express dependency and it routing feature to parse url's
var express = require('express');
var router = express.Router();

//user model $ passport for auth
const User = require('../models/user')
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project Tracker' });
});

/* GET/about */
router.get('/about', (req, res, next) =>{
  res.render('about', {
    title: 'About this site',
    pageText: 'Here is some info dynamic info from the controller'
  })
});

/*GET / register*/
router.get('/register', (req, res, next) => {
  res.render('register', { title: 'Please create an account'})
})

/*Post method register */
router.post('/register', (req, res, next) => {
  //invoke user model which extends passport-local-mongoose to create a new user in the DB
  //password gets passed as separate param for hashing
  User.register(new User({
    username: req.body.username
  }), req.body.password, (err, newUser) =>{
    if (err) {
      return res.redirect('/register')
    }
    else {
      //login the user in automatically & go to projects list
      req.login(newUser, (err) => {
        res.redirect('/projects')
      })
    }
  })
})

/* GET/ login*/
router.get('/login', (req, res, next) => {

  //check for login error messages in the session object & display if any
  let messages = req.session.messages || [];
  req.session.messages = []; //clear out any session messages

  res.render('login', {
    title: 'Please login',
    messages: messages //pass any error messages to the view for display
  })
})

/* POst / login */
 router.post('/login', passport.authenticate('local', {
   successRedirect: '/projects',
   failureRedirect: '/login',
   failureMessage: 'Invalid Login' // this gets stored in a session var

}))

/*get/logout */
router.get('/logout', (req,res,next) => {
  req.logout()
  res.redirect('/login')
})

/*Get / github - try github auth */
router.get('/github', passport.authenticate('github', { scope: ['user.email']}))

/*get/github/callback - what to do after github login */
router.get('/github/callback', passport.authenticate('github', {
      failureRedirect: '/login'}),
    (req, res, next) => {
      res.redirect('/projects')
    })


//makes the controller public
module.exports = router;
