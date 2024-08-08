console.log('node is working')
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()


app.use(cors());
mongoose.connect('mongodb://localhost:27017/Notes');
 
const NotesSchema = new mongoose.Schema({
    name:String,
    note:String,
    
})

const NotesModel = mongoose.model("notes", NotesSchema)
app.use(express.json());
app.get('/getData', (req, res)=>{
   NotesModel.find({}).then(function(notes){
        res.json(notes)
    }).catch(function(err){
        console.log(err)
    })
})

app.post('/add',async(req,res)=>{
    
     let data = new NotesModel({
        name:req.body.name,
        note:req.body.note
     })
     console.log(data);

     const result = await data.save();
     
    
    res.send(result);
})
app.listen(3001,()=>{
    console.log('app is runing')
})