const http =  require('http');
const fs= require('fs');
const server = http.createServer((req,res)=>{
    let  path='./rout/';
    switch(req.url){
        case '/':
            path+='html.html';
            res.statusCode= 200;
            break;
        case '/about':
            path+='about.html';
            res.statusCode= 200;
            break;
        case '/about-me':
            res.setHeader('Location','/about');
            res.end();
            res.statusCode= 301;
            break;
        case '/contact':
            path +='contact.html';
            res.statusCode= 200;
            break;
        default:
            path+= '/404.html';
            res.statusCode= 404;
            break;
    }

    fs.readFile(path,(err,data)=>{
        res.end(data);
       
    })
})
server.listen('4000','localhost',()=>{
    console.log('error message not happen');
})



// to redirect
