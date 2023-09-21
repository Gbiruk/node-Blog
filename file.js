const { isUtf8 } = require('buffer');
const file = require('fs');
const { clearScreenDown } = require('readline');

// //  to make directory 
// file.mkdir('./assets',(err)=>{
//   console.log("hellow we made a mistake");
// }
// )
// //to remove directory 

// file.rmdir('./assetts', (err)=>{
//   if(err){
//   console.log("sorry");
//   }
//   else{
//     console.log("yes yes yes yes yes yes yes yes yes yes yes yes")
//   }
// })



// //  to read  file


// file.readFile('file.txt', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     const man = () => {
//         const name = "biruk";
//         console.log(`the data is I will tell you data, ${name} ${data}`);
//     }

//     man(); // Call the function inside the callback
// });
// // man()// not work 







// //set Time out
// setTimeout(()=>{
//   console.log("the time is out")
// },4000)


// // existsSync

// if(file.existsSync('./assets')){
//   file.rmdir('assets',()=>{
//     console.log("deleted");
//   })

// }





// clearScreenDown
// //setInterval
// setInterval(()=>{
//   console.log(__filename)
// },5000)


//delete file 
 if(file.existsSync('./TXT/txt.txt')){
  file.unlink('./TXT/txt.txt',(err)=>{
    if(err){
      console.log(err);
    }
    else
    {
      console.log("yes boiksP");
    }
  })
 }




 // using stream to read data
 const file1=  file.createReadStream('./TXT/txt.txt',{encoding: 'utf8'})// this create the stream to us// talk to node where we reading
 file1.on('data',(chunk)=>{
  console.log(chunk.tostring())
 })//.on this is event listner to data// data listen to data that can be to use



 // towrite strream
 const file2 = file.createWriteStream('./TXT/txt1.txt');
//  file2.write(chunk);
  


 // Pipe used
  file1.pipe(file2)