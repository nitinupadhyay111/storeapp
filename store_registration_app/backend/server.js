const express = require('express');
const cors = require('cors');
const database = require('./database');
const port = 5000;
const app = express();
const userController = require('./controllers/user.controller');

let middleWare = (req, res, next) => {

        database.connectMongodb()
        .then((arg)=>{console.log(arg)})
        .catch((err)=>{console.log(err)})
        next();

};




app.use(cors());
app.use(middleWare);
app.use("/user", userController)

app.all('/', (req, res)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","X-Requested-With")
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify("Message server.js running " ))

});

// backend server listening

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})

