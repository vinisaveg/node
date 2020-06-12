const express = require('express')
const mongoose = require('mongoose')
const routes = require('./src/routes')
const cors = require('cors')

// App Init
const app = express()
app.use(express.json())
app.use(cors())

// DB Init
mongoose.connect('mongodb://localhost:27017/nodeapi', 
    { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
    }
)

// Routes
app.use('/api', routes)

// Port
app.listen(3001)