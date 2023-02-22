import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:any;
  password:any;

constructor(private fb:FormBuilder,private service:ServiceService,private route:Router,private toastr: ToastrService){}

ngOnInit():void{
}
loginform=this.fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*'),Validators.minLength(6)]]
})

login(){
  var email=this.loginform.value.email  
  var password=this.loginform.value.password
  if(this.loginform.valid){
    const result=this.service.loginUser(email,password).subscribe(
      (result:any)=>{
          localStorage.setItem('currentemail',JSON.stringify(result.currentemail))
          localStorage.setItem('currentuser',JSON.stringify(result.currentuser))
          localStorage.setItem('currentid',JSON.stringify(result.currentid))
          localStorage.setItem('Token',JSON.stringify(result.token))
          this.toastr.success(result.message,'Success')
          this.route.navigateByUrl('user')
      },(result:any)=>
        {
          alert(result.error.message)
        }
      
    )
    
  }
}
}
