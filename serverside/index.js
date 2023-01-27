const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express();
const port = 8080

app.use(cors());

app.use(express.json())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'jin'
})

app.get('/grades',(req,res) =>{
    db.query("SELECT * FROM Grades",(err, result)=>{
        if(err){
            console.log(err);
            res.status(400).json({message:"BAD REQUEST"})
        }else{
            if(result === ""){
                res.send({message:'NODATA'})
            }
            res.send(result)
        }
    })
})

app.get('/course',(req,res) =>{
    db.query("SELECT * FROM course" ,(err, result) =>{
        if(err){
            console.log(err)
            res.send(400).json({message:"Bad request"})
        }else{
            if(result === ""){
                res.send({data:"empty"})
            }
            res.send(result)
        }
    })
})

app.get('/grades/:id',(req,res) =>{
    const id = req.params.id
    db.query("SELECT * FROM Grades WHERE (courseId = ? )",id ,(err, result) =>{
        if(err){
            console.log(err)
            res.send(400).json({message:"Bad request"})
        }else{
            if(result === ""){
                res.send({data:"empty"})
            }
            res.send(result)
        }
    })
})

app.get('/std',(req,res) =>{
    db.query("SELECT * FROM Students" ,(err, result) =>{
        if(err){
            console.log(err)
            res.send(400).json({message:"Bad request"})
        }else{
            if(result === ""){
                res.send({data:"empty"})
            }
            res.send(result)
        }
    })
})
app.get('/user',(req,res) =>{
    db.query("SELECT * FROM Users" ,(err, result) =>{
        if(err){
            console.log(err)
            res.send(400).json({message:"Bad request"})
        }else{
            if(result === ""){
                res.send({data:"empty"})
            }
            res.send(result)
        }
    })
})

//server port listening
app.listen(port, () =>{
    console.log('server listen on port '+port)
})
