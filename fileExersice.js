const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Import the 'path' module

const BLog= require('./models/blogs');
const app= express();
app.listen(5000);
// Define a Mongoose model for items
const Item = mongoose.model('Item', { name: String });
const dburl = 'mongodb://localhost:27017/hellow';
mongoose.connect(dburl,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("you are conneced to mongo db")
})
.catch((err)=>{
  console.log(err);
})

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine' , 'ejs');
app.get('/all',(req,res)=>{
    BLog.find()
    .then((result)=>{
        res.render('index',{blogs:result, name:'biruk getachew'});
    })
    .catch((err)=>{
        console.log(err);
      })
})
app.get('/index/:id',(req,res)=>{
    const id= req.params.id;
    BLog.findById(id)
    .then((result)=>{
      res.render('details',{blogs: result});
    })
    .catch((err)=>{
       console.log(err);
     })
   })
app.get('/createblog',(req,res)=>{
    res.render('createblog');
})
app.post('/blogs',(req,res)=>{
    const blog= new BLog(req.body);
    blog.save()
    .then(()=>{
        res.redirect('/index');
    })
    .catch((err)=>{
        console.log(err);
      })
})
app.get('/',(req,res)=>{
    BLog.find()
    .then((result)=>{
        res.render('index',{blogs:result, name: ' biruk getachew'})
    })
    .catch((err)=>{
        console.log(err);
      })
})
app.get('/about',(req,res)=>{
    res.render('about');
})

app.get('/index',(req,res)=>{
    BLog.find()
    .then((result)=>{
        res.render('index',{blogs:result, name: ' biruk getachew'})
    })
    .catch((err)=>{
        console.log(err);
      })
})
app.delete('/index/:id',(req,res)=>{
    const id= req.params.id;
    BLog.findByIdAndDelete(id)
    .then(()=>{
      res.redirect('/index')
    })
     .catch((err)=>{
        console.log(err);
      })
})
app.get('/test',(req,res)=>{
    BLog.find({snippet:["now the day"]})
    .then((result)=>{
        res.render('test',{result:result});
    })
    .catch((err)=>{
        console.log(err);
      })
})


app.get('/index1',(req,res)=>{
    res.render('index1');
})
