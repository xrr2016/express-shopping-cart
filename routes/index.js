var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var csrf = require('csurf')

var csrfProtection = csrf()
router.use(csrfProtection)


/* GET home page. */
router.get('/', function(req, res, next) {
    Product.find({}, function(err, docs) {
        if (err) {
            console.log(err)
        }
        var productChunks = []
        var chunkSize = 4
        for (var i = 0; i < docs.length; i+=chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize))
        }
        res.render('shop/index', {
            title: 'Shopping Cart',
            products: productChunks
        })
    })
})

//Get user signup page
router.get('/user/signup',function (req,res,next) {
  res.render('user/signup',{csrfToken:req.csrfToken()})
})
//Post user signup
router.post('/user/signup',function (req,res,next) {
  res.redirect('/')
})

module.exports = router
