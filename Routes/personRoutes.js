const express=require('express')
const router=express.Router()

const person=require('../models/personSchema')

// add person @Post
router.post('/newperson', (req,res)=>{
    let newPerson=new person(req.body)
    newPerson.save((err,data)=>{
        err ? console.log(err) : res.send(data)
    })

})

// get user @Get
router.get('/',(req,res)=>{
    person.find({},(err,data)=>{
        err ? console.log(err) : res.json(data)
    })
})

// get person by id 
router.get('/:id',(req,res)=>{
    person.find({_id:req.params.id}, (err,data)=>{
        err ? console.log(err) : res.json(data)
    })
})


// find one
router.get('/food/:favoriteFoods',(req,res)=>{
    person.findOne({favoriteFoods:req.params.favoriteFoods}, (err,data)=>{
        err ? console.log(err) : res.json(data)
    })
})

// update by id

router.get('/hamburger/:id', (req, res) => {
    person.findById( {_id:req.params.id}, (err, data) => {
        data.favoriteFoods.push("hamburger");
        data.save(err ? console.log(err) : res.json({ data })
        );
    })
    })

// Create many People with Model.create() 
var arrayOfPeople = [
    {name: "youssef", age: 3,   favoriteFoods: ["lasagne"]},
    {name: "hajer", age: 26,    favoriteFoods: ["spaghetti"]},
    {name: "sirine", age: 35, favoriteFoods: ["chawarma"]}
];
    router.post('/many', (req, res) => {
    person.create (arrayOfPeople,(err,data)=>{
    err ? console.log(err) : res.json(data)
}
)})

//Perform New Updates on a Document Using model.findOneAndUpdate()

router.get('person/:id', (req, res) => {
    person.findOneAndUpdate( {_id:req.params.id},{...req.body},{new:true}, (err, data) => {
        
        data.save(err ? console.log(err) : res.json({ data })
        );
    })
    })


    //Delete One Document Using model.findByIdAndRemove

    router.delete('/:id',(req,res)=>{
        person.findByIdAndRemove({_id:req.params.id},(err,data)=>{
            err ? console.log(err) : res.json(data)
        })
    })

    //MongoDB and Mongoose - Delete Many Documents with model.remove()
    router.delete('/', (req, res) => {
        person.remove({ name: "hajer" }, (err, data) => {
            err ? console.log(err) : res.json({ msg: "ALL name:hajer deleted" })
        })
    })

    //Chain Search Query Helpers to Narrow Search Results
    router.get('/burritos', (req, res) => {
        person.find({ favoriteFoods: "burritos" }).
            sort({name: 1 }).
            limit(2).
            select({ age: false }).
            exec((err, data) => {
                err ? console.log(err) : res.json(data)
            })
    })
module.exports=router