var db = require("../config/connection");
var collection = require("../config/collections");
const bcrypt = require("bcrypt");




module.exports = {
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
        //let response={}
      userData.password = await bcrypt.hash(userData.password, 10);
      db.get()
        .collection(collection.USER_COLLECTION)
        .insertOne(userData).then((result)=>{
            resolve(result);
        })
        
    });
  },
  doLogin:(userData)=>{
    return new Promise(async(resolve,reject)=>{
        
        let response ={}
        let user = await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})

        if(user){
            bcrypt.compare(userData.password,user.password).then((status)=>{
                 if(status){
                     console.log('login successful')
                      response.user = user
                      response.status=true
                      console.log(status)
                      console.log(user);
                     resolve(response)
                 }
                 else{
                     console.log("login failed")
                     resolve({status:false})
                     
                 }
             })
         }
        else{
            console.log("login failed")
            resolve({status:false})
          
        }
    })
  }
};
