let express=require('express')
let ejs=require('ejs')
let multer=require('multer')
let path=require('path')

let port=3000
let app=express()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/myuploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  }) 
  
var upload = multer({
   storage: storage,
   }).single('profilepic')
  // storage is defined and is a single file in input name 
app.set('views',express.static(__dirname+'/views'))
app.set("view engine","ejs")
// multer el ulla file use cheyyanam
app.use(express.static('./public'))

app.get('/',(req,res)=>{
    res.render('index')
})
// we need to post the multer
// we need to check the upload is error, the error message is given by an object
//upload vilikam and uploadel errorum kodukam
app.post('/upload',(req,res)=>{
     upload(req,res,(error)=>{ 
       if(error){
         res.render('index', {
           message: error
      })}else{
          res.render('index',{
            message:'Successfully uploaded..',
            filename:`myuploads/${req.file.filename}`
          })
         }
     }) 
})

app.listen(port,()=>{
    console.log(`the server is in the port ${port}`)
})
