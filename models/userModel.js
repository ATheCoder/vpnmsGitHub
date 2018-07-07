const mongoose = require('mongoose')

let schema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    expiryDate: Date,
    expired: {type: Boolean, default: false}
})

schema.post('save', function (error, doc, next) {
    if(error.name === 'MongoError' && error.code === 11000){
      next(new Error('username with this name already exists!'))
    }
    else if(error){
      next(error)
    }
  })

module.exports = mongoose.model('User', schema)