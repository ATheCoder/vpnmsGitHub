const {exec} = require('child_process')

module.exports = async (username, password) => {
    await exec('echo ' + password + ' | ocpasswd -c ' + config.ocservPasswordFilePath +' ' + username)
    console.log('User "' + username + '" created sucessfully')
}