const mongoose = require('mongoose');
require('dotenv').config();
mongoose.
connect(process.env.mongouri,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        dbName:"AUTHENTICATION",
        useCreateIndex:true,
        useFindAndModify:false
    })  
.then(()=>{
    console.log("Ready ✔✔");
})
.catch((err)=>{
    console.log(e.message)
})
mongoose.connection.on('error',(err)=>{
    console.log(err.message);
})
