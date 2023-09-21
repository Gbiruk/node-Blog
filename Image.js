const express = require('express');
const multer = require('multer');
const app = express();
const mongoose= require('mongoose');
const imageSchema = new mongoose.Schema({
  imageData:{
    type: Buffer,
    required:true
  },
  title:{
    type: String,
    required:true

  }
});

const Image = mongoose.model('Image', imageSchema);

mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set('view engine', 'ejs');
app.listen(4000);
app.get('/upload',(req,res)=>{
  res.render('form');
})


const storage = multer.memoryStorage(); // Store the image in memory
const upload = multer({ storage });


app.post('/upload', upload.single('imageData'),(req,res)=>{
  const imageBuffer = req.file.buffer;
    const contentType = req.file.mimetype;
    const title = req.body.title; // Retrieve the title from the form

    // Create a new image document
    const newImage = new Image({
      title: title,
      imageData: imageBuffer,
      contentType: contentType,
    });
  newImage.save()
  .then((result)=>{
    res.render('form')
  })
  .catch((err)=>{
    console.log(err);
  })
})
app.get('/get', (req, res) => {
  Image.find()
    .then((result) => {
      if (result && result.length > 0) {
        const images = [];

        // Iterate through the array of images
        result.forEach((image) => {
          if (image && image.imageData) {
            // Convert the image data (Buffer) to a base64-encoded string
            const imageBase64 = image.imageData.toString('base64');
            const contentType = image.contentType;

            // Create a data URI for the image
            const dataURI = `data:${contentType};base64,${imageBase64}`;

            // Push the dataURI into the images array
            images.push(dataURI);
          }
        });

        // Pass the array of data URIs to the EJS template
        res.render('display', { images: images });
      } else {
        res.render('display', { images: [] }); // Handle case when no images are found
      }
    })
    .catch((err) => {
      console.log(err);
      res.render('display', { images: [] }); // Handle errors
    });
});
