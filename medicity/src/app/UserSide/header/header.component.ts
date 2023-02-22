import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentemail:any;
  constructor(private service:ServiceService,private route:Router){}
  search(event:any){
    let searchKey=event.target.value
    this.service.searchKey.next(searchKey)
  }
  
  logoutUser(){  
    localStorage.removeItem('currentuser')
    localStorage.removeItem('currentemail')
    localStorage.removeItem('Token')
    this.route.navigateByUrl('')
  }

  gotofavorite(){
    this.currentemail=localStorage.getItem('currentemail')
    this.route.navigateByUrl(`/user-favorites/${this.currentemail}`)
  }
}
