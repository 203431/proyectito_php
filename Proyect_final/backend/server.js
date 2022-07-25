const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const cors = require('cors')

const routes = require('./routes')

const app = express()
app.set('port', process.env.PORT || 3001)
const dbOptions = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'plant_check'
}


// middlewares -------------------------------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())

// routes -------------------------------------------
app.use(routes);
app.get('/', (req, res)=>{
    res.send('Welcome to my API')
})


// server running -----------------------------------
app.listen(app.get('port'), ()=>{
    console.log('server running on port', app.get('port'))
})