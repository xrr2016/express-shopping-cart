// var mongoose = require('mongoose')
// var Schema = mongoose.Schema
module.exports = function Cart(oldCart) {

  this.items = oldCart.items || {}
  this.totalNum = oldCart.totalNum || 0
  this.totalPrice = oldCart.totalPrice || 0

  this.add = function (item,id) {
    var storedItem = this.items[id]
    if (!storedItem) {
      storedItem = this.items[id] = {item:item,num:0,price:0}
    }
    storedItem.num++
    storedItem.price = item.price * storedItem.num
    this.totalNum++
    this.totalPrice += storedItem.item.price
  }

  this.generateArray = function () {
    var arr = []
    for (var id in this.items) {
        arr.push(this.items[id])
    }
    return arr
  }
}
