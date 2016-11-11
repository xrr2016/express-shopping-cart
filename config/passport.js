var passport = require('passport')
var User = require('../models/user')
var LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })
    //注册
passport.use('local.signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, email, password, done) {
        req.checkBody('email', '不合法的email格式').notEmpty().isEmail()
        req.checkBody('password', '不合法的密码').notEmpty().isLength({
            min: 6
        })
        var errors = req.validationErrors()
        if (errors) {
            var errorsMesssage = []
            errors.forEach(function(error) {
                errorsMesssage.push(error.msg)
            })
            return done(null, false, req.flash('error', errorsMesssage))
        }
        User.findOne({
            'email': email
        }, function(err, user) {
            if (err) {
                return done(err)
            }
            if (user) {
                return done(null, false, {
                    message: '邮箱已经被使用了!'
                })
            }
            var newUser = new User()
            newUser.email = email
            newUser.password = newUser.encryptPassword(password)
            console.log(newUser)
            newUser.save(function(err, result) {
                if (err) {
                    return done(err)
                }
                return done(null, newUser)
            })
        })
    }))
    //登录
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    req.checkBody('email', '不合法的email格式').notEmpty().isEmail()
    req.checkBody('password', '不合法的密码').notEmpty()
    var errors = req.validationErrors()
    if (errors) {
        var errorsMesssage = []
        errors.forEach(function(error) {
            errorsMesssage.push(error.msg)
        })
        return done(null, false, req.flash('error', errorsMesssage))
    }
    User.findOne({
        'email': email
    }, function(err, user) {
        if (err) {
            return done(err)
        }
        if (!user) {
            return done(null, false, {
                message: '未找到用户,请重新创建'
            })
        }
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: '密码错了'
            })
        }
        return done(null, user)
    })
}))
