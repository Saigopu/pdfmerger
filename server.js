// referred this https://expressjs.com/en/starter/hello-world.html and brought the below code   
// installed express module in this folder with the command "npm i express" and guess what the package-lock.json file node_modules folder are added to this project(which is very common)

//while learning the javascript through the video 98(file 98 in node_from_95 folder) we have installed nodemon globally, so i have tried starting this file by the command "npm run nodemon .\server.js" but it gave some errors which were the same when i have first installed the nodemon in file 98 of node_from_95 folder so i referred comments of that file and came to know that we need to edit the scripts of package.json file of the project in which we are using nodemon

// at 6:00 harry has faced some other issue and got resolved but i didnt (have a look)

//PLAN IS TO CREATE AN APP IN WHICH MULTIPLE PDF FILES CAN BE SENT TO THE SERVER AND SERVER WILL MERGE THEM AND SENDS THE MERGED PDF FILE

const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public')) //at 26:00 referred https://expressjs.com/en/starter/static-files.html#serving-static-files-in-express to know how to serve static files

const {mergePdfs}=require("./merge.js")//here we have mergePdfs as the variable name but we can take anything, brought this module in commonjs way

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templates/index.html"))// this serves the index.html file in the templates folder
})

//one thing to observe here is the method we mentioned in the index.html matches with ".post" here and the action of form in index.html matches with the first parameter. name of the input tag where the files are uploaded is kept as the first parameter of upload.array
app.post('/merge', upload.array('pdfs', 3), async (req, res, next)=> {//3 is the maximum no. of file that can be choosen 
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    // console.log(req.files)//req.files is the array of object and as many pdf files we add as many objects will be there in the array , each object will be having the information about the file
    
    let d=await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))//req.files[0].path is the path at which the first pdf file is uploaded 
    //the last parameter in app.post is a function initially it was a normal function but at 36:00 ot was made async function to use await because mergePdfs takes some time to merge till then res.redirect should not be executed 
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
    // res.send({data:req.files})// here we are returning an object with key data and the value an array of object in which the information about the pdf files we uploaded is present to the page /merge and files are sent in the body of the request with the help of multer
  })//this snippet is taken from https://expressjs.com/en/resources/middleware/multer.html

  // doubt explore this app.post and app.get, its parameters and its functionalities. and know the code taken from sites are works behind
  //doubt what __dirname
  //doubt what is res, req, res.send, res.redirect
  // doubt what are static files
 

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


// installed multer with the command "npm i multer" in the current folder, multer helps us to upload files in nodejs apps

//at 19:00 installed pdf-merger package with the command "npm i pdf-merger-js" in the current folder