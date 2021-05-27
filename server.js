

const express=require('express')
const app=express()


// create database with server
const databaseConnect=require('./database')
databaseConnect()

//parse the data
app.use(express.json())
app.use('/persons',require('./Routes/personRoutes'))

const port =5000

app.listen(port,(err)=>{
    err?console.log(err):console.log('the port is runing en 5000')})