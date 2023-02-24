const express=require('express');
const app=express();
const mysql=require('mysql2');
const bodyParser=require("body-parser");
const cors =require("cors");

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Very_Strong_Password123",
    database:"crud"
});


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/get",(req,res)=>{
    const sqlGet="SELECT * FROM details";
    db.query(sqlGet,(err,result)=>{
        console.log(err);
        console.log(result);
        res.send(result);
    });
});

app.get("/sample",(req,res)=>{
    const s="select email from details";
    db.query(s,(err,result)=>{  
        console.log(err);
        res.send(result);
    });
});


app.post("/api/post",(req,res)=>{
    const {firstname,lastname,email,contact}=req.body;
    const sqlInsert="insert into details(firstname,lastname,email,contact) values(?,?,?,?)";
    db.query(sqlInsert,[firstname,lastname,email,contact],(err,result)=>{
        if(err){
            console.log(err);
        }

    });
});

app.delete("/api/remove/:id",(req,res)=>{
    const {id}=req.params;
    const sqlRemove="delete from details where id=?";
    db.query(sqlRemove,id,(err,result)=>{
        if(err){
            console.log(err);
        }
        // console.log("delete success...")

    });
});

app.get("/api/get/:id",(req,res)=>{
    const {id}=req.params;
    console.log(id);
    const sqlGetId="SELECT * FROM details where id=?";
    db.query(sqlGetId,id,(err,result)=>{
        if(err){
            console.log(err);
            console.log(result);
        }
        res.send(result);
    });
});

app.get("/api/put/:id",(req,res)=>{
    const {id}=req.params;
    const {firstname, lastname, email,contact}=req.body;
    const sqlGet="update details set firstname=?,lastname=?,email=?,contact=? where id=?";
    db.query(sqlGet,[firstname,lastname,email,contact,id],(err,result)=>{
        if(err){
            console.log(err);
            console.log(result);
        }
        res.send(result);
    });
});

app.get("/",(req,res)=>{
    // const sqlInseet="insert into details(firstname,lastname,email,contact) values('Arun','Saji','arunsaji13march@gmail.com',9603415714)";
    // db.query(sqlInseet,(err,result)=>{
    //     console.log("error",err);
    //     console.log("result", result);
    //     res.send("Hello Arun");
    // });
    res.send("Hello Arun");
});



app.listen(5000,()=>{
    console.log("server is runnig o the port 5000");
})