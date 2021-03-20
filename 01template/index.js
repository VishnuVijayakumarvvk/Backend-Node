const express=require('express')
const path=require('path')
let app=express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine','pug')

app.get('/',(req,res)=>{
    res.render('index')
})
app.listen(5000,()=>{console.log('server is running in the web')})
 

// after setting template set which is view engine