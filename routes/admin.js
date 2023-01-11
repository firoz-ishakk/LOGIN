const { openStyle } = require('cli-color/lib/sgr');
var express = require('express');
const { render } = require('../app');
//const productHelpers = require('../helpers/product-helpers');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers')
const adminhelpers = require("../helpers/admin-helpers")

var productHelpers=require('../helpers/product-helpers')


/* GET users listing. */
router.get('/', function(req, res) {
  if(req.session.admin){
    productHelpers.getAllproducts().then((users)=>{
      console.log(users)
      res.render('admin/view-products',{admin:true,users})
    })
  }else{
    res.redirect('/admin/adminlogin')
  }
  
});

router.get('/add-products',function(req,res){
  res.render("admin/add-products")

})
router.post("/add-products",(req,res)=>{
  console.log(req.body)
  // console.log(req.files.image)
  userHelpers.doSignup(req.body).then(()=>{
    res.redirect("/admin")
  })
})

router.get('/delete-user/:id',(req,res)=>{
  let userId=req.params.id
  console.log(userId)
  productHelpers.deleteUser(userId).then((response)=>{
res.redirect('/admin/')
  })
})

router.get('/edit-user/:id',async(req,res)=>{
  let user = await productHelpers.getUserDetails(req.params.id)
  console.log(user);
  res.render('admin/edit-user',{user})
})

router.post("/edit-user/:id",(req,res)=>{
  console.log(req.body);

  productHelpers.updateUser(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
  })
})
router.get('/adminLogin',(req,res)=>{
  if(req.session.adminLoggedIn){
    res.redirect("/admin")
  }
  else{
    res.render("admin/adminlogin",{loginErr: req.session.loginErr})
    req.session.loginErr = false
  }
   
})

router.post("/adminlog",(req,res)=>{
  adminhelpers.adminlogin(req.body).then((response)=>{
    if(response.status){
      req.session.admin = response.admin
      req.session.adminLoggedIn = true
      res.redirect("/admin")
    }
    else {
      req.session.loginErr="Invalid username or password"
      res.redirect("/admin/adminlogin")

    }
  })

})

module.exports = router;
