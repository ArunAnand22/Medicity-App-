import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
constructor(private service:ServiceService,private route:Router){}
ngOnInit():void{}

  search(event:any){
    let searchKey=event.target.value;
    this.service.searchkey.next(searchKey)  
  }

  adminLogout(){
    localStorage.removeItem('AdminEmail')
    localStorage.removeItem('Admintoken')
    this.route.navigateByUrl('admin')
  }
}
