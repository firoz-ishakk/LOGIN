const db = require('../config/connection')
const userHelpers = require("./user-helpers")
const collections = require("../config/collections")
module.exports={
    adminlogin:(adminData)=>{
        console.log(adminData);
        let response={}
        return new Promise(async(resolve,reject)=>{
            let admin = await db.get().collection(collections.ADMIN_COLLECTION).findOne({email: adminData.email})
            if(admin){
                console.log(admin)
                if(admin.password === adminData.password){
                    response.admin = adminData.email;
                    response.status = true;
                    resolve(response)
                }
                else{
                    resolve({status:false})
                }

            }
            else{
                resolve({status:false})
            }
        })
    }



}
