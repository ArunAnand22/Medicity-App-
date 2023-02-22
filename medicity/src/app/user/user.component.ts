import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  useremail:any;
  allproducts:any;
  searchTerm:string='';
  user:any;
constructor(private service:ServiceService,private route:Router){
  if(localStorage.getItem('currentemail')){
    this.user=JSON.parse(localStorage.getItem('currentuser') || '')
  }
}
ngOnInit():void{
  if(!localStorage.getItem('currentemail')){
    this.route.navigateByUrl('');
    console.log("Please login");
    
  }
    this.allproducts=this.service.getallstores().subscribe(
      (result:any)=>{
        this.allproducts=result.store
      },
      (result:any)=>{
        alert(result.error.message);
      }
    )
    this.service.searchKey.subscribe(
      (data:any)=>{
        this.searchTerm=data
      }
    )
  }

  addtoFavorite(store:any){
    this.useremail=localStorage.getItem('currentemail')
    this.service.addtofavorites(this.useremail,store).subscribe(
      (result:any)=>{
        alert(result.message)
      },
      (result:any)=>{
        alert(result.error.message)
      }
    )
  }
}




