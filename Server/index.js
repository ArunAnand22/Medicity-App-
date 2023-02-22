//import express
const express=require('express')
//import cors
const cors=require('cors')
//import dataService.js 
const dataService=require('./Services/dataService')
//import jsonwebtoken
const jwt=require('jsonwebtoken')

//create app using express
const app=express()
//json
app.use(express.json())
//cors
app.use(cors({
    origin:"http://localhost:4200"
}))
//create port number
app.listen(3000,(req,res)=>{
    console.log("Running on port 3000");
})

//Router specific Middleware
 //-use only in functions when the authentication is needed
const jwtRouterMiddleware = (req,res,next)=>{
    try{
        console.log('Router specific middleware');
    const token = req.body.token;
    const data = jwt.verify(token,'superkey2023')
    console.log(data);
    next();
    }catch{
        //422-unprocessible entity
        res.status(422).json({
            statusCode:422,
            status:false,
            message:"Please login"  
        })
    }
}

//API call to get all stores
app.get('/all-stores',(req,res)=>{
    dataService.getStores().then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})
//API call to register new user
app.post('/register-user',(req,res)=>{
    dataService.register(req.body.email,req.body.name,req.body.password).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})
//API call to login user
app.post('/login-user',(req,res)=>{
    dataService.loginUser(req.body.email,req.body.password).then(
    (result)=>{
        res.status(result.statusCode).json(result)
    }
    )
})
//API call to add store to favorites from user side
app.post('/user-favorite',(req,res)=>{
    dataService.userFavorite(req.body.useremail,req.body.place,req.body.pharmacy,req.body.delivery,req.body.phone,req.body.image,req.body.location).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})
//API call to get data from favorites
app.post('/user-favoritelist',(req,res)=>{
    dataService.getUserFavorites(req.body.useremail).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})
//API call to delete data from Favorite
app.delete('/delete-favorite/:id',(req,res)=>{
    dataService.removeuserFavorite(req.params.id).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})

//API call to delete store from db
app.delete('/delete-store/:id',(req,res)=>{
    dataService.deleteStore(req.params.id).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})
//API call to delete user from user side
app.delete('/delete-user/:id',(req,res)=>{
    dataService.deleteUser(req.params.id).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})
//API call to add new store to db from admin side
app.post('/add-store',(req,res)=>{
    dataService.addStore(req.body.place,req.body.pharmacy,req.body.delivery,req.body.phone,req.body.pin,req.body.image,req.body.location).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})
//API call to get single store
app.get('/getsingleuser/:id',(req,res)=>{
    dataService.getsingleStore(req.params.id).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})
//API call to update store from admin panel
app.post('/updatesingleuser/:id',(req,res)=>{
    dataService.updatesingleStore(req.params.id,req.body.place,req.body.pharmacy,req.body.delivery,req.body.phone,req.body.pin,req.body.image,req.body.location).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})
//Admin login
app.post('/admin-login',(req,res)=>{
    dataService.adminLogin(req.body.email,req.body.password).then(
        (result)=>{
            res.status(result.statusCode).json(result)
        }
    )
})