// midlleware is name for any code which is run server and getting request and send response app.get and app.use is middleware

const express = require('express');
const app = express();
const morgan= require('morgan');
morgan
app.listen(3000);

app.use((req,res,next)=>{
    console.log(req.path);
    console.log(req.method);
    next();
})
app.get('/', function (req,res){
  //  res.send(' hellow');
  res.sendFile('./views/index.html',{root: __dirname});
 
});

//third party middleware
// example morgan

