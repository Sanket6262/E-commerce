const express = require ('express');
const bodyParser = require('body-parser');
const routesAPI = require('./routes/api');
const {connectDB}= require('./config/db');

const app = express();


// app.get('/',(req,res)=>{
//     res.status(200).send('HelloWorld')
// })

app.use(express.json());
app.use(bodyParser.json());

connectDB();

app.use('/api', routesAPI);

app.listen(5005,()=>{
    console.log("Server started");
})