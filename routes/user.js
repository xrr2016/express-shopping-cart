var express = require('express');
var router = express.Router();
var csrf = require('csurf')
var passport = require('passport')

var csrfProtection = csrf()
router.use(csrfProtection)


//Get user signup page
router.get('/signup', function(req, res, next) {
    var messages = req.flash('error')
    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    })
})

//Post user signup
router.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/signup',
        failureFlash: true
}))

//Get user signin
router.get('/signin',function (req,res,next) {
  var messages = req.flash('error')
  res.render('user/signin', {
      csrfToken: req.csrfToken(),
      messages: messages,
      hasErrors: messages.length > 0
  })
})

//Post user signin
router.post('/signin',passport.authenticate('local.signin',{
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}))
//Get user profile page
router.get('/profile', function(req, res, next) {
    res.render('user/profile')
})
module.exports = router
