const userModel = require('../models/userModel')
const expireUser = require('./expireUser')

module.exports = async () => {
    let result = []
    let allUsers = await userModel.find({})
    for(let user of allUsers){
        if(!user.expired){
            if(Date.now() > user.expiryDate){
                expireUser(user.username)
                await userModel.findByIdAndUpdate(user._id, {$set: {expired: true}})
                result.push(user._id)
            }
        }
    }
    return result
}