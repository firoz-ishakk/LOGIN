var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers')
const userHelpers = require('../helpers/user-helpers')
const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }
  else{
    res.redirect('/login')
  }
}
/* GET home page. */

  


  let products = [
  {
    name: "iphone 12",
    category:"Mobile",
    image:"https://www.reliancedigital.in/medias/Apple-iPhone-14-Pro-Max-Mobile-Phone-493177798-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3wyMzk2N3xpbWFnZS9qcGVnfGltYWdlcy9oZDQvaDAzLzk4OTA3MjgyNDczMjYuanBnfGM1ZDU5NmEyOTUzZmZkMWViODBhZDQzODdjM2E3ZmEzOWZmYzA3NzliNDNhNDgxZGE4NTk5YzY5NDIyZmExYWE",
  },

  {
    name: "iphone 11",
    category:"Mobile",
    image:"https://www.reliancedigital.in/medias/Apple-iPhone-14-Pro-Max-Mobile-Phone-493177798-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3wyMzk2N3xpbWFnZS9qcGVnfGltYWdlcy9oZDQvaDAzLzk4OTA3MjgyNDczMjYuanBnfGM1ZDU5NmEyOTUzZmZkMWViODBhZDQzODdjM2E3ZmEzOWZmYzA3NzliNDNhNDgxZGE4NTk5YzY5NDIyZmExYWE",
  },
  {
    name: "iphone 10",
    category:"Mobile",
    image:"https://www.reliancedigital.in/medias/Apple-iPhone-14-Pro-Max-Mobile-Phone-493177798-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3wyMzk2N3xpbWFnZS9qcGVnfGltYWdlcy9oZDQvaDAzLzk4OTA3MjgyNDczMjYuanBnfGM1ZDU5NmEyOTUzZmZkMWViODBhZDQzODdjM2E3ZmEzOWZmYzA3NzliNDNhNDgxZGE4NTk5YzY5NDIyZmExYWE",
  }
]


router.get('/', function(req, res, next) {
  let user = req.session.user
    console.log("cookie session")
  console.log(user)
 
  res.render('index',{products,user})
});
router.get('/login',(req,res)=>{
  if(req.session.loggedIn){
    res.redirect('/')
  }
  else{
    res.render('user/login',{"loginErr":req.session.loginErr})
    req.session.loginErr = false
  }
 
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signed',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response)
    res.redirect('/login')
  })
})

router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn = true 
      req.session.user = response.user
       
      res.redirect('/')
    }
    else{
     console.log(response.status)
     req.session.loginErr="invalid email or password"
      res.redirect("/login")
    }
  })
})
router.get("/logout",(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})



module.exports = router;
