const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes/routes')

app.use(cors({ credentials: true, origin:  "http://localhost:3000"}))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use('/', routes)

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log('Programa iniciado')
})