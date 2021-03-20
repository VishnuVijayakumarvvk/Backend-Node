let express=require('express')
let passport=require('passport')
let Strategy=require('passport-facebook')
let ejs=require('ejs') 
let path=require('path') 

let port =3000;
let app=express()
 
passport.use(new Strategy({
    clientID:'255640726036029',
    clientSecret:'3b7ceac0c94886b8ed0928ae768ef64b',
    callbackURL:'http://localhost:3000/login/facebook/return'
},function(acceptToken,RefreshToken,profile,cb){
    return cb(null,profile)
}))

passport.serializeUser(function(user,cd){
    cb(null,user)
})
passport.deserializeUser(function(obj,cd){
    cb(null,obj)
})

app.set('views',path.join(__dirname,'/views'))
app.set('view engine','ejs')

app.use(require('morgan')('combined'))
app.use(require('body-parser').urlencoded({extended:true}))
app.use(require('cookie-parser')())
app.use(require('express-session')({secret: 'facebook auth',
resave: true,
saveUninitialized: true}))

// @route - GET /
// @desc -  a route to home
// @access- PUBLIC
app.get('/',(req,res)=>{
    res.render('home',{user: req.user})
})
// @route - GET / login
// @desc -  a route to login
// @access- PUBLIC
app.get('/login',(req,res)=>{
    res.render('login')
})
// @route - GET /login/facebook
// @desc -  a route to login using facebook
// @access- PUBLIC
app.get('/login/facebook',
  passport.authenticate('facebook'));
// @route - GET /login/facebook/callback
// @desc -  a route to login using facebook if failed
// @access- PUBLIC
app.get('/login/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  // @route - GET /profile
// @desc -  a route to profile
// @access- PRIVATE
app.get('/profile',require('connect-ensure-login').ensureLoggedIn(),(req,res)=>{
    res.render('profile',{user: req.user})
})
app.listen(port,()=>{
    console.log(`the server is running in the port ${port}....`)
})