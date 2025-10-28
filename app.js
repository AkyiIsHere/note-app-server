require('dotenv').config();

const express = require('express');
const app = express()
const errorHandler = require('./src/middlewares/errorHandler');
const router = require('./src/routes/index');
const cors = require('cors')

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))

const corsOptions = {
    origin: "*",
};
app.use(cors(corsOptions));

app.use('/api', router);

app.get('/',(req,res)=>{
    res.json({
        isSuccess: true,
        statusCode: 200,
        message: "Welcome to note management server!"
    })
})

app.use(errorHandler);

module.exports = app;