const express = require('express');
const app = express();
app.listen(3000);

app.get('/', function (req,res){
  //  res.send(' hellow');
  res.sendFile('./rout/html.html',{root: __dirname});
    });


app.get('/about', function (req,res){
        res.sendFile('./rout/about.html',{root: __dirname});
        });

app.get('/about-us', function (req,res){
            res.redirect('/about');
            });
app.use((req,res)=>{
    res.status(404).sendFile('./rout/404.html',{root: __dirname});
})// this is middleware  , use means use this function to every requist
