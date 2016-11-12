var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var Cart = require('../models/cart')

/* GET home page. */
router.get('/', function(req, res, next) {
        var successMsg = req.flash('success')[0]
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
                products: productChunks,
                successMsg:successMsg,
                noMessage:!successMsg
            })
        })
    })
    //添加到购物车
router.get('/add-to-cart/:id', function(req, res, next) {
        var productId = req.params.id
        var cart = new Cart(req.session.cart ? req.session.cart : {})

        Product.findById(productId, function(err, product) {
            if (err) {
                return res.redirect('/')
            }
            cart.add(product, product.id)
            req.session.cart = cart
            console.log(req.session.cart)
            res.redirect('/')
        })
    })
    //查看购物车
router.get('/shooping-cart', function(req, res, next) {
        if (!req.session.cart) {
            return res.render('shop/shopping-cart', {
                products: null
            })
        }
        var cart = new Cart(req.session.cart)
        res.render('shop/shopping-cart', {
            products: cart.generateArray(),
            totalPrice: cart.totalPrice
        })
    })
    //checkout
router.get('/checkout', function(req, res, next) {
        if (!req.session.cart) {
            return res.redirect('/shopping-cart')
        }
        var cart = new Cart(req.session.cart)
        var errMsg = req.flash('error')[0]
        res.render('shop/checkout', {
            total: cart.totalPrice,
            errMsg :errMsg,
            noError:!errMsg
        })
    })
    //Post checkout
router.post('/checkout', function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart')
    }
    var cart = new Cart(req.session.cart)
    var stripe = require("stripe")(
        "sk_test_iuwpV2alDTFQgEncB05rpv02"
    )
    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "usd",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "hi"
    },function(err, charge) {
      if (err) {
        req.flash('error',err.message)
        return res.redirect('/checkout')
      }
      req.flash('success','购买成功!')
      req.session.cart = null
      res.redirect('/')
    });
})


module.exports = router
