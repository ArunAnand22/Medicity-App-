//import db
const db=require('./db')
//import jsonwebtoken
const jwt=require('jsonwebtoken')
//get all store details
const getStores=()=>{
    return db.Store.find().then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    store:result
                }
            }else{
                return{
                    status:false,
                    statusCode:401,
                    message:"No match found"
                }
            }
        }
    )
}
//Register new user
const register=(email,name,password)=>{
    return db.User.findOne({email}).then(
        (result)=>{
            if(result){
                return{
                    status:false,
                    statusCode:401,
                    message:"User already exists"
                }
            }else{
                const newUser=new db.User({
                    email:email,
                    name:name,
                    password:password
                })
                newUser.save()
                return{
                    status:true,
                    statusCode:200,
                    message:"Register successful"
                }
            }
        }
    )
}
//Login user
const loginUser=(email,password)=>{
    return db.User.findOne({email,password}).then(
        (result)=>{
            if(result){
                currentemail=result.email;
                currentpassword=result.password;
                currentuser=result.name;
                //token generation
                const token=jwt.sign({currentemail:email},'superkey2023')//superkey will generate the token
                return{
                    status:true,
                    statusCode:200,
                    message:"Login successful",
                    token:token,
                    currentemail:email,
                    currentuser:result.name,
                    currentid:result._id
                }
            }else{
                return{
                    status:false,
                    statusCode:401,
                    message:"Invalid user details"
                }
            }
        }
    )
}
//Add to favorite from user side
const userFavorite=(useremail,place,pharmacy,delivery,phone,image,location)=>{
    return db.Favorite.findOne({useremail,phone}).then(
        (result)=>{
                if(result){
                    return{
                        status:false,
                        statusCode:401,
                        message:"Store already in favorites"
                    }
                }else{
                    const newFavorite=new db.Favorite({
                        useremail,
                        place,
                        pharmacy,
                        delivery,
                        phone,
                        image,
                        location
                    })
                    newFavorite.save();
                    return{
                        status:true,
                        statusCode:200,
                        message:"Store added successfully"
                    }
                }
        }
    )
}
//Get stores from Favorites
const getUserFavorites=(email)=>{
    return db.Favorite.find({email}).then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    message:"Success",
                    data:result
                }
            }else{
                return{
                    status:false,
                    statusCode:401,
                    message:"Not found"
                }
            }
        }
    )
}
//Remove from Favorite list
const removeuserFavorite=(id)=>{
    return db.Favorite.findByIdAndDelete(id).then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    message:"Deleted from list",
                    data:result
                }
            }else{
                return{
                    status:false,
                    statusCode:401,
                    message:"Store not found"
                }
            }
        }
    )
}
//Delete store from db
const deleteStore=(_id)=>{
    return db.Store.deleteOne({_id}).then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    store:result,
                    message:"Store removed successfully"
                }
            }else{
                return{
                    status:false,
                    statusCode:401,
                    message:"Item not found"
                }
            }
        }
    )
}

//delete user from user side
const deleteUser=(id)=>{
    return db.User.findOneAndDelete({id}).then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    message:"User deleted successfully",
                    user:result
                }
            }else{
                return{
                    staus:false,
                    statusCode:401,
                    message:"User not found"
                }
            }
        }
    )
}
//add to store
const addStore=(place,pharmacy,delivery,phone,pin,image,location)=>{
return db.Store.findOne({phone}).then(
    (result)=>{
        if(result){
            return{
                status:false,
                statusCode:400,
                message:"User already exists"
            }
        }else{
            const newStore=new db.Store({
                place,
                pharmacy,
                delivery,
                phone,
                pin,
                image,
                location
            })
            newStore.save()
            return{
                status:true,
                statusCode:200,
                message:"Store added successfully"
            }
        }
    }
)
}
//Get single store data from db
const getsingleStore=(id)=>{
    return db.Store.findById(id).then(
        (result)=>{
            if(result){
                return{
                    status:true,
                    statusCode:200,
                    message:"User found",
                    store:result
                }
            }else{
                return{
                    status:false,
                    statusCode:401,
                    message:"User not found"
                }
            }
        }
    )
}
//update store from admin panel
const updatesingleStore=(id,place,pharmacy,delivery,phone,pin,image,location)=>{
    return db.Store.updateOne({_id:id},
        {
            place:place,
            pharmacy:pharmacy,
            delivery:delivery,
            phone:phone,
            pin:pin,
            image:image,
            location:location
        }
    ).then(
       (result)=>{
        if(result){
            return{
                status:true,
                statusCode:200,
                message:"User updated",
                store:result
            }
        }else{
            return{
                status:false,
                statusCode:401,
                message:"Updation failed"
            }
        }
       } 
    )
}
//Login for admin
const adminLogin=(email,password)=>{
    return db.Admin.findOne({email,password}).then(
        (data)=>{
            if(data){
                adminEmail=data.email;
                adminPassword=data.password;
                //token generation
                token=jwt.sign({adminEmail},'super2023')
                return{
                    status:true,
                    statusCode:200,
                    message:"Welcome Arun",
                    adminEmail:adminEmail,
                    adminPassword:adminPassword,
                    token:token
                }
            }else{
                return{
                    status:false,
                    statusCode:401,
                    message:"Are you lost?.."
                }
            }
        }
    )
}
//export
module.exports={
    getStores,
    register,
    loginUser,
    deleteStore,
    addStore,
    deleteUser,
    getsingleStore,
    updatesingleStore,
    adminLogin,
    userFavorite,
    getUserFavorites,
    removeuserFavorite
}