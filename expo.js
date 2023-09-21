const express= require('express')
const mongoo= require('mongoose')
const app= express();
const multer = require('multer');

app.listen(3000);
app.get('/index',(req,res)=>{
    res.sendFile('./views/form.html',{root:__dirname});
})
mongoo.connect('mongodb://localhost/Image', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const imageSchema = new mongoo.Schema({
    data: Buffer, // Store image binary data as a Buffer
    contentType: String, // Store the content type (e.g., 'image/jpeg', 'image/png')
  });
  
  const Image = mongoo.model('Image', imageSchema);





// Define a storage strategy for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  // Access the uploaded image via req.file
  const imageBuffer = req.file.buffer;
  // Save the image to MongoDB
  // Example: Use a MongoDB driver like mongoose to save the image data to a collection
  // mongoose.model('Image').create({ data: imageBuffer }, (err, image) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Image upload failed' });
    } else {
      res.status(200).json({ message: 'Image uploaded successfully' });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// ... (middleware setup and other routes)

// Handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  // Access the uploaded image via req.file
  const imageBuffer = req.file.buffer;

  // Save the image to MongoDB
  Image.create({
    data: imageBuffer,
    contentType: req.file.mimetype, // Store the content type
  })
    .then((image) => {
      res.status(200).json({ message: 'Image uploaded successfully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Image upload failed' });
    });
});

// ... (other route handling and server start)
