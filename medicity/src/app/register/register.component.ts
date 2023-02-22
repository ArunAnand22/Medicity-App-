import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email:any;
  name:any;
  password:any;

  constructor(private fb:FormBuilder,private service:ServiceService,private route:Router,private toastr:ToastrService){}
  ngOnInit():void{}
  //model for register 
  registerform=this.fb.group({
    email:['@gmail.com',[Validators.required,Validators.email]],
    name:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*'),Validators.minLength(6)]]
  })

  register(){
    var email=this.registerform.value.email
    var name=this.registerform.value.name
    var password=this.registerform.value.password

    if(this.registerform.valid){
      const result=this.service.registerUser(email,name,password).subscribe(
        (result:any)=>{
          this.toastr.success(result.message,"Success")
          this.route.navigateByUrl('')
        },
        (result:any)=>{
          this.toastr.error(result.error.message,"Error")
        }
      )
    }
  }
}
