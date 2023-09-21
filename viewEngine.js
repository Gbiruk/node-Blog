const express = require('express');
const app = express();
app.listen(3000);


app.set('view engine', 'ejs');
app.get('/', function (req,res){
  //  res.send(' hellow');
//   res.sendFile('./rout/html.html',{root: __dirname});
const blogs=[
  {title:'hellow the world that is stupid',snnipet:'bye bye bye bye bye the world of this earth'},
  {title:'hellow the world that is nice',snnipet:'come bye bye bye bye the world of this earth'},
  {title:'hellow the world that is nisid',snnipet:'cobye bye bye bye bye the world of this earth'}
]
  res.render('html',{na:'Bruk', blogs:blogs});// render the html view
});


app.get('/about', function (req,res){
    res.render('about');  // render about view
        });

app.get('/about-us', function (req,res){// handler function
            res.redirect('/about');
            });
app.get('/blog/create', function (req,res){
  res.render('createblog');
})
app.use((req,res)=>{
    res.status(404).render('404');// render 404 view 
})// this is middleware  , use means use this function to every requist
