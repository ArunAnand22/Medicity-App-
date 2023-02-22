import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  id:any;
  place:any;
  pharmacy:any;
  delivery:any;
  phone:any;
  pin:any;
  image:any;
  location:any;
  updatestoreForm:any;  
constructor(private fb:FormBuilder,private route:Router,private toast:ToastrService,private service:ServiceService,private url:ActivatedRoute){
  //Form Validation
this.updatestoreForm=this.fb.group({
  place:['',[Validators.required]],
  pharmacy:['',[Validators.required]],
  delivery:['',[Validators.required]],
  phone:['',[Validators.required]],
  pin:['',[Validators.required]],
  image:['',[Validators.required]],
  location:['',[Validators.required]]
})
}
ngOnInit(){
  this.id=this.url.snapshot.paramMap.get('id')
  this.service.singleStore(this.id).subscribe(
    (data:any)=>{
      this.updatestoreForm.patchValue({
        place:data.store.place,
        pharmacy:data.store.pharmacy,
        delivery:data.store.delivery,
        phone:data.store.phone,
        pin:data.store.pin,
        image:data.store.image,
        location:data.store.location    
      })
    },
    (data:any)=>{
      console.log(data.error.message);
    }
  )
}
//update store from admin side
updateStore(){
  var id=this.id
  var place=this.updatestoreForm.value.place
  var pharmacy=this.updatestoreForm.value.pharmacy
  var delivery=this.updatestoreForm.value.delivery
  var phone=this.updatestoreForm.value.phone
  var pin=this.updatestoreForm.value.pin  
  var image=this.updatestoreForm.value.image
  var location=this.updatestoreForm.value.location
  
  if(this.updatestoreForm.valid){
  this.service.updateStore(id,place,pharmacy,delivery,phone,pin,image,location).subscribe(
    (data:any)=>{
      this.toast.success(data.message,'Success')
      this.route.navigateByUrl('/admin-dash')
    },(data:any)=>{
      this.toast.error(data.message)
    }
  )
  }
  
  
  
}
}
