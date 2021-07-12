const mongoose = require('mongoose');
// const db_uri = process.env.ATLAS_URI;
const db_uri = "mongodb+srv://admin:csEFx-nH3@B!N3d@cluster0.v3xst.mongodb.net/Cluster0?retryWrites=true&w=majority"

console.log(mongoose.connection.readyState);

let connectMongodb = () => {

    return new Promise((resolve, reject)=>{

        mongoose.connect(db_uri, {useNewUrlParser: true, useUnifiedTopology: true});

        mongoose.connection
        .once("open", ()=>{
            console.log("Connected");
            const connStatus = mongoose.connection.readyState;
            resolve(connStatus);
        })
        .on("error", (error)=>{
            console.log("Error" + error);
            reject("Connection failed");
        });

    }    
    
    );

};

module.exports.connectMongodb = connectMongodb;