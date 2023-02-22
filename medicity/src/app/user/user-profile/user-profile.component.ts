import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user:any;
  email:any;
  id:any;
  constructor(private service:ServiceService,private route:Router){
    this.user=localStorage.getItem('currentuser')
    this.email=localStorage.getItem('currentemail')
  }
  ngOnInit():void{}

  deletetheUser(){
    const id=localStorage.getItem('currentid');
    this.service.deleteUser(id).subscribe(
      (result:any)=>{
        alert(result.message);
        this.route.navigateByUrl('');
      },
      (result:any)=>{
        alert(result.error.message);
      }
    )
  }
}
