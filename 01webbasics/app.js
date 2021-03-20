const express=require('express')
const app=express()
var time=function(req,res,next){
    req.requestTime=Date.now()
    next()
}
app.use(time)
app.get('/',(req,res)=>{
    res.send('this is the home page ' + ' and the time is ' + req.requestTime)
})
app.listen(3000,()=>{
    console.log('the server is in the host')
})
