let mongoose=require('mongoose')
require('dotenv').config()

// install and setting mongoose
const databaseConnect=()=>{
    mongoose.connect(process.env.DB_URI,{ useUnifiedTopology: true, useNewUrlParser: true,useFindAndModify:false},(err)=>{
        
        err ? console.log(err) : console.log('database connected')
    })
}
module.exports=databaseConnect
