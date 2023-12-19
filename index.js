const express= require('express')
const { connection } = require('./config/db.js')
const { userRouter } = require('./routes/users.route.js')
const { urlRouter } = require('./routes/urls.route.js')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
require('dotenv').config()
const app = express()
const PORT = process.env.port || 4000
app.use(express.json()) 

app.get("/",(req,res)=>{
    res.send("Welcome to url shortner app")
})

app.use("/users",userRouter) //api for user login / logout.
app.use("/url",urlRouter) //api for making post request to shorten url.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // swagger documentation on this endpoint.

// Running on port 4000
app.listen(PORT,async()=>{
    try {
        await connection
        console.log("Conected to database")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`Running on port ${PORT}`)
})