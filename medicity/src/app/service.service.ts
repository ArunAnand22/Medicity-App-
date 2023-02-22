import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  email: any;
  phone:any;
  password:any;

  constructor(private http:HttpClient) { }
  //Register user
  registerUser(email:any,name:any,password:any){
    const body={
      email,
      name,
      password
    }
    return this.http.post('http://localhost:3000/register-user',body)
  }

  //Login user
  loginUser(email:any,password:any){
    const body={
      email,
      password
    }
    return this.http.post('http://localhost:3000/login-user',body)
  }
  // get allstores from db
  getallstores(){
    return this.http.get("http://localhost:3000/all-stores")
  }
//user page
  searchKey=new BehaviorSubject('')

//admin page
  searchkey=new BehaviorSubject('')

  //Add to favorites
  addtofavorites(useremail:any,store:any){
    const body={
      useremail,
      place:store.place,
      pharmacy:store.pharmacy,
      delivery:store.delivery,
      phone:store.phone,
      image:store.image,
      location:store.location
    }
    return this.http.post('http://localhost:3000/user-favorite',body)
  }

  //Get stores from favorites
  getfavorites(useremail:any){
    const body={
      useremail
    }
    return this.http.post('http://localhost:3000/user-favoritelist',body)
  }
  //Delete stores from favorite list
  removefromfavorite(id:any){
    return this.http.delete('http://localhost:3000/delete-favorite/'+id)
  }

  //Delete user from user side
  deleteUser(id:any){
    return this.http.delete("http://localhost:3000/delete-user/"+id)
  }
  //Delete store from db from admin panel
  deleteStore(_id:any){
    return this.http.delete(`http://localhost:3000/delete-store/${_id}`)
  }
  //get single store
  singleStore(id:any){
    return this.http.get(`http://localhost:3000/getsingleuser/${id}`)
  }
  //update store
  updateStore(id:any,place:any,pharmacy:any,delivery:any,phone:any,pin:any,image:any,location:any){
    const body={
      id,
      place,
      pharmacy,
      delivery,
      phone,
      pin,
      image,
      location
    }
    return this.http.post(`http://localhost:3000/updatesingleuser/${id}`,body)
  }

  //Add store into db from admin panel
  addStore(place:any,pharmacy:any,delivery:any,phone:any,pin:any,image:any,location:any){
    const body={
      place,
      pharmacy,
      delivery,
      phone,
      pin,
      image,
      location
    }
    return this.http.post('http://localhost:3000/add-store',body)
  }  



  //Admin login - temporary storage
  adminLogin(email:any,password:any){
    const body={
      email,
      password
    }
    return this.http.post('http://localhost:3000/admin-login',body)
  }
}  
