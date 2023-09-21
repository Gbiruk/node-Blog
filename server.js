// const express= require('express');
// //express use this
// const app= express();
// app.listen('3000',(req,res)=>{
//     console.log('hellow');
// })



// node true
const http= require('http');

const fs = require('fs');
const server = http.createServer((req,res)=>{// this callback run every time requist made and create server
    console.log(req.url, req.method);

    // setHeader type
    res.setHeader('Content-Type','text/html');
    fs.readFile('./html.html',(err,data)=>{
       res.write(data);
       res.end();
    });
    // res.write("hellow ninga");
    // res.end();
  

});
server.listen('3000','localhost',()=>{
    console.log("we are listen actively");
})