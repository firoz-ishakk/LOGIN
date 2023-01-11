var db = require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectId
var bcrypt = require("bcrypt")
module.exports={

    
    getAllproducts:()=>{
        return new Promise(async (resolve,reject)=>{
            let users= await db.get().collection(collection.USER_COLLECTION).find().toArray()
            console.log(users);
            resolve(users)
        })
    },
    deleteUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).deleteOne({_id:objectId(userId)}).then((response)=>{
               
                resolve(response)
            })
        })
    },

    getUserDetails:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).findOne({_id:objectId(userId)}).then((user)=>{
                resolve(user)
            })
        })
    },
    updateUser:(userId,userDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({_id:objectId(userId)},
            {$set:{
                name:userDetails.name,
                email:userDetails.email
            }
        }).then((response)=>{
            resolve(response)
        })

        }
    )
    }
}