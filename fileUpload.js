const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema for storing image data in MongoDB
const imageSchema = new mongoose.Schema({
  filename: String,
  filepath: String
});

const Image = mongoose.model('Image', imageSchema);

// Configure multer middleware for file uploads store file in server disk and destination upload folder and filename is
// stored timestamp and extension
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  }
});
//multer({ storage }): This part of the code initializes a Multer middleware instance by calling multer()

const upload = multer({ storage });

// Serve HTML form to upload images
app.get('/', (req, res) => {
  res.sendFile('./views/file.html',{root:__dirname});
});

// Handle image upload
app.post('/upload', upload.single('image'), async (req, res) => {
  const { filename, path: filepath } = req.file;

  try {
    // Save image data to MongoDB
    const image = new Image({
      filename,
      filepath
    });

    await image.save();

    res.send('Image uploaded successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading image');
  }
});

app.get('/images', (req, res) => {
    // Use the 'fs' module to read the contents of the 'uploads' directory
    const fs = require('fs');
    const uploadDir = path.join(__dirname, 'uploads');
  
    fs.readdir(uploadDir, (err, files) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error reading upload directory');
      }
     
      // Filter the files to only include image files (you can customize this filter)
      const imageFiles = files.filter(file => /\.(jpg|jpeg|PNG|gif)$/i.test(file));
      // Generate HTML to display the images
      const imagesHTML = imageFiles.map(file => {
        const imageUrl = path.join( '/uploads', file);
        return `<img src="${imageUrl}" alt="${file}" style="max-width: 100px;">`;
      }).join('');
      // Send the generated HTML as the response
      res.send(`<h1>Uploaded Images</h1>${imagesHTML}`);
    });
  });
  
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




// The line app.post('/upload', upload.single('image'), async (req, res) => { ... } is an Express.js route handler that handles HTTP POST requests made to the '/upload' endpoint. This specific route is used for uploading files, and it utilizes the Multer middleware for file handling. Let's break down what this line of code does:

// app.post('/upload', ...):

// app.post() is a method in Express.js used to define an HTTP POST request route.
// '/upload' specifies the URL path where this route will be triggered. In this case, it's the '/upload' endpoint.
// upload.single('image'):

// upload is an instance of the Multer middleware that you previously configured with specific settings, including the storage engine.
// .single('image') is a method of the upload middleware instance. It configures this route to expect a single file upload with the field name 'image' in the HTTP request. This means that the client making the request should include a file input field with the name 'image' in their form when submitting the POST request.
// async (req, res) => { ... }:

// This is an asynchronous arrow function that serves as the route handler for the '/upload' endpoint. It takes two parameters: req (the request object) and res (the response object).
// const { filename, path: filepath } = req.file;:

// Inside the route handler, this line destructures the req.file object. The req.file object is provided by the Multer middleware and contains information about the uploaded file.
// filename is extracted, which represents the name of the uploaded file.
// path is extracted and renamed as filepath, which represents the temporary path where the uploaded file is stored on the server.




// Middleware Execution:

// When an HTTP request is made to a route that is configured to use the file upload middleware (e.g., upload.single('image')), the middleware intercepts the request before it reaches your route handler.
// File Processing:

// The file upload middleware, such as Multer, processes the incoming file(s) based on the configuration you provided. It handles things like parsing the uploaded file, saving it to the specified destination, and managing its metadata.
// req.file Object:

// After processing the uploaded file, the middleware creates an object that contains information about the uploaded file. This object is typically named req.file and is attached to the request object (req) by the middleware itself.
// The req.file object contains properties like filename, path, mimetype, and more, depending on the middleware's configuration and the details of the uploaded file