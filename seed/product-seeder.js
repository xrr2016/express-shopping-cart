var Product = require('../models/product')
var mongoose = require('mongoose')
mongoose.connect('localhost:27017/shopping')

var products = [
    new Product({
        imagePath: 'http://hunan.sinaimg.cn/2014/0424/U6995P1192DT20140424103559.jpg',
        title: '海报标题',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru.',
        price: 24
    }),
    new Product({
        imagePath: 'http://hunan.sinaimg.cn/2014/0424/U6995P1192DT20140424103559.jpg',
        title: '海报标题',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru.',
        price: 24
    }),
    new Product({
        imagePath: 'http://hunan.sinaimg.cn/2014/0424/U6995P1192DT20140424103559.jpg',
        title: '海报标题',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru.',
        price: 24
    }),
    new Product({
        imagePath: 'http://hunan.sinaimg.cn/2014/0424/U6995P1192DT20140424103559.jpg',
        title: '海报标题',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostru.',
        price: 24
    })
]

var done = 0;
for (let i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++
        if (done === products.length) {
            exit()
        }
    })
}

function exit() {
    mongoose.disconnect()
}
