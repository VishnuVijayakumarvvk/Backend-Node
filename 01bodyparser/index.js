const express=require('express')
const bodyparser=require('body-parser')
let app=express()

app.use(bodyparser.urlencoded({ extended : false }))
app.use('/login',express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.send('this is the home page')
})
// /login location is passed by middleware
// bodyparser is passed as req.body using middleware
// study the code for body parser and filelocating
app.post('/login',(req,res)=>{  
    console.log(req.body)
    res.redirect('/')
})
app.listen(3000,()=>{console.log('the server is running in the port')})

// middleware is used for passing and in the form of req
//  here /login should be passed with a folde so uses middleware and the ('/login',express.static(__dirname+'/public'))
//  the loginid and password should be passed 
//         in order to get login id and pass we use bodyparse and use middleware to pass that, passing of body parser 
//         is in the form of  req.body