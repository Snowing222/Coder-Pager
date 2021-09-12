const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth.js')
const { ApplicationPage } = require('twilio/lib/rest/api/v2010/account/application')

const app = express()
const PORT = process.env.PORT || 5000

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, resp)=>{
    resp.send('hello, world!')

})

app.use('/auth', authRoutes);

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))