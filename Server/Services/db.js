//import mongoose
const mongoose=require('mongoose')
//connection string
mongoose.connect('mongodb://127.0.0.1:27017/stores',()=>{
    console.log("Connected to mongodb");
})
//Create a model for the products
const Store=mongoose.model('Store',{
    //schema creation
    id:Number,
    place:String,
    pharmacy:String,
    delivery:String,
    phone:Number,
    pin:Number,
    image:String,
    location:String
})
//Create a model for users
const User=mongoose.model('User',{
    //schema creation
    email:String,
    name:String,
    password:String,
})
//Create a model for admin
const Admin=mongoose.model('Admin',{
    //schema creation
    email:String,
    password:String
})
//Create a model for favorites
const Favorite=mongoose.model('Favorite',{
    useremail:String,
    place:String,
    pharmacy:String,
    delivery:String,
    phone:Number,
    image:String,
    location:String
})

//Export model
module.exports={
    Store,
    User,
    Admin,
    Favorite
}