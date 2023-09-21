const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Import the 'path' module

const BLog= require('./models/blogs');
const app = express();
app.listen(3000);
const dburl = 'mongodb://localhost:27017/hellow';
mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
   
    console.log("hellow");
})
.catch(error => {
  console.error(error);  
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Define a Mongoose model for items
const Item = mongoose.model('Item', { name: String });
app.set('view engine' , 'ejs');


app.get('/add',(req,res)=>{
    const Blog= new BLog({
        title: 'new blogs 2',
        snippet : ' hellow this is snippet',
        body : ' the body is nothing to do'
    });
    Blog.save()
    .then((result)=>{
       res.send(result);
    });
})
app.get('/all',(req,res)=>{
    BLog.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.get('/blogs',(req,res)=>{
    BLog.find().sort({createdAt: -1})
    .then((result)=>{
        res.render('html',{na: 'Blogs', blogs: result })
    })
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
app.delete('/index/:id',(req,res)=>{
    const id= req.params.id;
    BLog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/index'});
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.get('/one',(req,res)=>{
    BLog.findById('64ee007506ec848bd6eabee7')
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
})
app.get('/index',(req,res)=>{
    BLog.find()
    .then((result)=>{
        res.render('index',{blogs: result,name:'biruk getachew'})
    })
})
app.get('/index/:id',(req,res)=>{
    const id= req.params.id;
    BLog.findById(id)
    .then((result)=>{
        res.render('details',{result:result})
    })
})
app.get('/createblog',(req,res)=>{
res.render('createblog')
})
app.get('/about',(req,res)=>{
    res.sendFile('./views/about.html',{root: __dirname})
    })
app.get('/about-me',(req,res)=>{
    res.statusCode = 301;
        res.redirect('/about');

        })
app.get('/test',(req,res)=>{
            BLog.find({title:'hellow',snippet:'now the day'})
            .then((result)=>{
                res.render('test',{result:result});
            })
            .catch((err)=>{
                console.log(err);
              })
        })
app.use((req,res)=>{
        res.status(404).sendFile('./views/404.html',{root: __dirname});
        })