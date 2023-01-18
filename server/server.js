const express = require('express');
const app = express();
const dotenv = require('dotenv')
const router = require('./route')
const db =require('./database')
const multer = require("multer")
const model = require("./model/model")
const cors = require('cors')
const corsOption = {
    credentials:true,
    origin: [process.env.Clinet_URL],
}
const path = require("path")
app.use("/upload",express.static('./upload'))
app.use('/img', express.static(path.join(__dirname,'upload')));
app.use(cors(corsOption))



const UPLOAD_FOLDER = "./upload";

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,UPLOAD_FOLDER)
    },
    filename:(req,file,cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("_") + "_" + Date.now();

        cb(null,fileName + fileExt)
    }
})



let upload = multer({
    storage:storage,
    limits:{
        fileSize:10000000,
    },
    fileFilter:(req,file,cb) => {
       if(
         file.mimetype == "image/png"||
         file.mimetype == "image/jpg"||
         file.mimetype == "image/jpeg"||
         file.mimetype == "application/pdf"
       ){
            cb(null,true);
       }else{
          cb(false)
       }
    }
})


//database
db()

//config
app.use(express.json());
dotenv.config()
app.use(router)


app.post("/addupload",upload.single("image"), async (req,res) => {
   try{ 
    const {image,title} = req.body;
    const imageUrl = req.file.path;
   
    const data = await model.create({title:title,image:imageUrl})
    
    res.status(200).json({
        success:true,
        data
    })
  }catch(err){
    console.log('upload error')
  }
})



app.get("/getall",async (req,res) => {
   try{ 
    const data = await model.find();
    res.json({
        data
    })
 }catch(err){
    console.log('gettalll error')
 }
})

app.get("/all",async (req,res) => {
    await model.deleteMany({})
})

app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  });
