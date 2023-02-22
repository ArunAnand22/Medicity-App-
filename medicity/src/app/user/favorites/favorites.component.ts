import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {  
  favoritestores:any=[];
  eMsg:any;
  currentemail:any;
  constructor(private service:ServiceService,private activateRoute: ActivatedRoute,private route:Router){
  }
  ngOnInit():void{
    
    const useremail = String(this.activateRoute.snapshot.paramMap.get('email'))
    this.service.getfavorites(useremail).subscribe(
      (result:any)=>{
        this.favoritestores=result.data
        
      },
      (result:any)=>{
        alert(result.error.message)
      }
    )
  }  

  //Remove from favorite list
  removefromfavorite(favorite:any){
    this.service.removefromfavorite(favorite._id).subscribe(
    (result:any)=>{
      alert(result.message)
      this.route.navigateByUrl('/user')
    },
    (result:any)=>{
      result.error.message
    }
    )
  }
}
