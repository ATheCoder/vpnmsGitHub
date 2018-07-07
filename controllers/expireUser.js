const {exec} = require('child_process')
const config = require('../config')

module.exports = async (username) => {
    exec('ocpasswd -c ' + config.ocservPasswordFilePath + ' -d ' + username, () => {
        console.log('User Deleted from File!')
    })
}