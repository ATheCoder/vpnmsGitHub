const userModel = require('../models/userModel')
const moment = require('moment')
const { exec } = require('child_process')
const config = require('../config')

module.exports = async (username, password, days) => {
    try{
        let newUser
        if(days === 0){
            newUser = await userModel.create({username: username, password: password, expiryDate: moment().add(30, 'seconds')})
        }else newUser = await userModel.create({username: username, password: password, expiryDate: moment().add(days, 'days')})
        exec('echo ' + password + ' | ocpasswd -c ' + config.ocservPasswordFilePath +' ' + username, function(err, stdout, stderr){
            console.log(stdout)
        })
        return newUser;
    }catch(e){
        throw e
    }
}