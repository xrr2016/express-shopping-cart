var express = require('express');
var router = express.Router();
var csrf = require('csurf')
var passport = require('passport')
var csrfProtection = csrf()
var Product = require('../models/product')

router.use(csrfProtection)

/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find({}, function(err, docs) {
        if (err) {
            console.log(err)
        }
        var productChunks = []
        var chunkSize = 4
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize))
        }
        res.render('shop/index', {
            title: 'Shopping Cart',
            products: productChunks
        })
    })
})

//Get user signup page
router.get('/user/signup', function(req, res, next) {
    var messages = req.flash('error')
    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    })
})

//Post user signup
router.post('/user/signup', passport.authenticate('local.signup', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/signup',
        failureFlash: true
}))
    //Get user profile page
router.get('/user/profile', function(req, res, next) {
    res.render('user/profile')
})

module.exports = router
