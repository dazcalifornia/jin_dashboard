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
    database:'test'
})

app.get('/test',(req,res) =>{
    db.query("SELECT * FROM province WHERE 1",(err, result)=>{
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

//server port listening
app.listen(port, () =>{
    console.log('server listen on port '+port)
})
