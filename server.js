const express =require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");
const dataPath = path.join(__dirname,"src","users.json");
const productPath = path.join(__dirname,"src","products.json");

app.use(express.json());
app.use(express.urlencoded(()=>{extended: True}));
app.use(express.static(path.join(__dirname,"src")));

//HOME
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"src","index.html"));
})

//LOGIN
app.get("/login", (req,res)=>{
    res.sendFile(path.join(__dirname,"src","login.html"));
})

app.post("/form1",(req,res)=>{
    const newData = req.body;
    fs.readFile(dataPath,"utf-8",(err,data)=>{
        let products = [];
        if(!err && data){
            products = JSON.parse(data);
            const check = products.find(p=>p.email===newData.email);
                if(!check){
                    res.send(`
<html>
<head>
<style>
  body { font-family: Arial; background: #fceeee; padding: 40px; color: #aa2727;}
  .container { background: white; border-radius: 10px; padding: 40px; max-width: 400px; margin: 30px auto; box-shadow: 0 0 14px #efb1b1;}
  a { color: #5381FFFF; }
</style>
</head>
<body>
  <div class="container">
    <h4>User Doesn't Exist.</h4>
                        <h3>Please <a href="/signup">Sign Up</a> First.</h4
  </div>
</body>
</html>
`)
                }else if(check.password!=newData.password){
                    res.send(`
<html>
<head>
<style>
  body { font-family: Arial; background: #fdf1ec; padding: 40px; color: #e67e22;}
  .container { background: white; border-radius: 10px; padding: 40px; max-width: 400px; margin: 30px auto; box-shadow: 0 0 14px #ffd2b5;}
  a { color: #5381FFFF;}
</style>
</head>
<body>
  <div class="container">
    <h3>Wrong password! <a href="/login">Login</a> with correct password</h3>
  </div>
</body>
</html>
`);
                }else{
                    res.redirect("/table")
                }
                }
    })
})

//SIGNUP
app.get("/signup", (req,res)=>{
    res.sendFile(path.join(__dirname, "src", "signup.html"));
})

app.post("/form2", (req,res)=>{
    const newData = req.body;

    fs.readFile(dataPath,"utf-8",(err,data)=>{
        let products = [];
        if(!err && data){
            products = JSON.parse(data);
        }if(err){
            res.status(404).send("Error: 404");
        }

        const check = products.find(p=>p.email===newData.email);

        if(check){
            res.send(`
<html>
<head>
<style>
  body { font-family: Arial; background: #f4f4f4; padding: 40px; color: #333; }
  .container { background: white; border-radius: 10px; padding: 40px; max-width: 400px; margin: 30px auto; box-shadow: 0 0 12px #ccc;}
  a { color: #007BFF; text-decoration: none; }
  h3 { color: #e74c3c; }
</style>
</head>
<body>
  <div class="container">
    <h3>Already signed up! Please <a href="/login">Login</a></h3>
  </div>
</body>
    </html>
   `)
        }else{
            products.push(newData);
            fs.writeFile(dataPath,JSON.stringify(products),(err)=>{
                if(err){
                    res.send("TMKOC");
                }else{
                    res.send(`
<html>
<head>
<style>
  body { font-family: Arial; background: #e3ffe8; padding: 40px; }
  .container { background: white; border-radius: 10px; padding: 40px; max-width: 400px; margin: 30px auto; box-shadow: 0 0 14px #a9f9c5;}
  a { color: #5381FFFF; }
  h3 { color: #27ae60; }
</style>
</head>
<body>
  <div class="container">
    <a href="/">🏠 Home</a>
    <h3>Sign up successful! Please <a href="/login">Login</a></h3>
  </div>
</body>
</html>
`);
                }
            })
        }
    })
})

//TABLE
app.get("/table",(req,res)=>{
    res.sendFile(path.join(__dirname,"src","table.html"));
});

app.post("/form3",(req,res)=>{
    fs.readFile(productPath,"utf-8",(err,data)=>{
        const newData = req.body;
        let products = [];
        if(!err && data){
            products = JSON.parse(data);
            let check = products.find(p=>p.name===newData.name);
            if(check){
                res.json({message:"saved", newData, check});
            }else{
                res.json({message:"PRODUCT NOT FOUND!"})
            }
        }else{
            res.send("DATA NOT FOUND");
        }
    })
});

//DETAIL
app.get("/details",(req,res)=>{
    const newName = req.query.name;
    const newImage = req.query.image;
    //console.log(newName);
    //console.log(newImage);
    fs.readFile(productPath, "utf-8", (err,data)=>{
        let products=[];
        products = JSON.parse(data);
        //console.log(products);
        let check = products.find(p=> newName===p.name);
        //console.log(check);
        if(check){
            res.send(`
                      <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${check.name} Details</title>
        <style>
         body { font-family: Arial; background: #f5faff; padding: 40px; color: #34495e; }
  .container { background: white; border-radius: 10px; padding: 40px; max-width: 500px; margin: 30px auto; box-shadow: 0 0 14px #bfe4fa;}
  h1 { color: #007BFF; margin-bottom: 10px;}
  img { border-radius: 12px; margin-top: 18px; box-shadow: 0 2px 8px #ccc;}
        </style>
    </head>
                      <body>
                      <img src="${newImage}" width="180px" alt="${check.name}"/>
                      <h1>${check.name}</h1>
                      <h3><span style="color:#16a085;">$${check.price}</span></h3>
                      <h4>Brand: ${check.brand}</h4>
                      <h4>Storage: ${check.storage}</h4>
                      <h4>RAM: ${check.ram}</h4>
                      <h4>Battery: ${check.battery}</h4>
                      <body>
                      </html>
                     `)
            }else{
                res.json("Data Not Found");
            }
    })
})

app.listen(3000, ()=>{
    console.log("http://localhost:3000");
})