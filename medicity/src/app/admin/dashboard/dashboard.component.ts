import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  allstores:any;
  searchTerm:string='';
  adminid:any;
  id:any;
  place:any;
  pharmacy:any;
  delivery:any;
  phone:any;
  pin:any;
  image:any;
  location:any;  
  
constructor(private service:ServiceService,private route:Router,private fb:FormBuilder,private toast:ToastrService){}
ngOnInit():void{
  if(!localStorage.getItem('AdminEmail')){
    this.route.navigateByUrl('admin');
    console.log("Please login");
    
  }
  this.allstores=this.service.getallstores().subscribe(
    (data:any)=>{
      this.allstores=data.store 
    },
    (data:any)=>{
      alert(data.error.message)
    }
  )

  this.service.searchkey.subscribe(
    (data:any)=>{
      this.searchTerm=data;
    }
  )
}
//Form Validation
addstoreForm=this.fb.group({
  place:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
  pharmacy:['',[Validators.required]],
  delivery:['',[Validators.required]],
  phone:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(10)]],
  pin:['',[Validators.required,Validators.pattern('[0-9]*'),Validators.minLength(6)]],
  image:['',[Validators.required]],
  location:['',[Validators.required]]

})

//delete store
deleteStore(store:any){
  this.id=store._id;
  this.service.deleteStore(this.id).subscribe(
    (result:any)=>{
      this.allstores=result.store
      this.route.navigateByUrl('/admin-dash')
      alert(result.message)
    },
    (result:any)=>{
      this.toast.error(result.message,"Error")
    }
  )
}
//Add new store
addStore(){
  var place=this.addstoreForm.value.place;
  var pharmacy=this.addstoreForm.value.pharmacy;
  var delivery=this.addstoreForm.value.delivery;
  var phone=this.addstoreForm.value.phone;
  var pin=this.addstoreForm.value.pin;
  var image=this.addstoreForm.value.image;
  var location=this.addstoreForm.value.location;

  if(this.addstoreForm.valid){
    const result=this.service.addStore(place,pharmacy,delivery,phone,pin,image,location).subscribe(
      (data:any)=>{
        this.route.navigateByUrl('admin-dash')
        alert(data.message)
      },
      (data:any)=>{
        alert(data.error.message)
      }
    )
  }
}

}
