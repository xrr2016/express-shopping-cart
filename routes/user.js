var express = require('express');
var router = express.Router();
var csrf = require('csurf')
var passport = require('passport')

var csrfProtection = csrf()
router.use(csrfProtection)

//Get user profile page
router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile')
})

//退出登录
router.get('/logout', isLoggedIn, function(req, res, next) {
    req.logout()
    res.redirect('/')
})

//检查是否登录
router.use('/', notLoggedIn, function(req, res, next) {
    next()
})

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
    failureRedirect: '/user/signup',
    failureFlash: true
}), function(req, res, next) {
    if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl
      req.session.oldUrl = null
      res.redirect(oldUrl)
    } else {
        res.redirect('user/profile')
    }
})

//Get user signin
router.get('/signin', function(req, res, next) {
    var messages = req.flash('error')
    res.render('user/signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    })
})

//Post user signin
router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), function(req, res, next) {
    if (req.session.oldUrl) {
      var oldUrl = req.session.oldUrl
      req.session.oldUrl = null
      res.redirect(oldUrl)
    } else {
        res.redirect('user/profile')
    }
})


module.exports = router

//已经登录
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}
//未登录
function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}
