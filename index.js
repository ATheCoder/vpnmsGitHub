const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config')
const app = express()
const findExpiredUsers = require('./controllers/findExpiredUsers')
const userModel = require('./models/userModel')
const moment = require('moment')
const addNewUser = require('./controllers/addNewUser')
//exampleCHANGE
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Its working!')
})

app.get('/expiredUsers', async (req, res) => {
    let expiredUsers = await findExpiredUsers()
    res.status(200).json(expiredUsers)
})

app.post('/createUser', async (req, res) => {
    let {secret, username, password, days} = req.body
    if(secret === config.adminSecret){
        try{
            let newUser = await addNewUser(username, password, days)
            res.status(200).json(newUser)
        }catch(e){
            res.status(500).send(e.message)
        }
    }
    else{
        res.status(400).send('Invalid Secret Dude!')
    }
})

mongoose.connect(config.databaseURL)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
    console.log('Connection to Database established at: ' + config.databaseURL)
    let expiredUsers = await findExpiredUsers()
    console.log('Expired users found now: ')
    console.log(expiredUsers)
    setInterval(findExpiredUsers, config.intervalForCheckingExpiry)
    console.log('Will check for expired users every: ' + config.intervalForCheckingExpiry)
})

app.listen(config.port, () => {
    console.log('server running on port: ' + config.port)
})