import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private service:ServiceService,private fb:FormBuilder,private route:Router,private toast:ToastrService){}
  ngOnInit():void{}  
//Form validation
  adminForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  //Admin login section
  adminLogin(){
    var email=this.adminForm.value.email;
    var password=this.adminForm.value.password  

    if(this.adminForm.valid){
      this.service.adminLogin(email,password).subscribe(
        (result:any)=>{
          localStorage.setItem("AdminEmail",JSON.stringify(result.adminEmail))
          localStorage.setItem("Admintoken",JSON.stringify(result.token))
          this.toast.success(result.message)
          this.route.navigateByUrl('admin-dash')
        },
        (result:any)=>{
          this.toast.error(result.error.message,'Error')
        }
      )
    }
  }
}
