//Require the necessarities
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const ejs = require('ejs')
const cors = require('cors')

const PORT = process.env.PORT || 5000

const app = express()
dotenv.config()

//middleware
app.set('view engine','ejs')
app.use(cors())



//connect to the database
mongoose.connect(process.env.DB_CONNECT)
.then(()=>{
    console.log('Connected to mongodb')
    // app.listen(PORT, () => console.log(`App running on port ${PORT}`))
}).catch(error => {
    resizeBy.status(400).json({mesage: error.message})
})

app.listen(PORT, () => console.log(`App running on port ${PORT}`))