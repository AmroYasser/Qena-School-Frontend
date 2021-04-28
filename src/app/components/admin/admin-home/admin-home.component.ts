import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginserviceService } from 'src/services/loginservice.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
 id:number|any
 is_super:boolean|any
  constructor(private loginserv:LoginserviceService,private router:Router) {
    this.id=localStorage.getItem('admin_id')
   }

  ngOnInit(): void {
    
    if(JSON.parse(<string>localStorage.getItem("isLoggedIn"))){
    this.loginserv.get_admin_user(this.id).subscribe(
      (res)=>{
        if(res.manager==null){
          
          this.is_super=true
          console.log(this.is_super);
        }

        else{
          
          this.is_super=false
        }
        
      },
      (err)=>{
        this.router.navigate(['./'])
        
      }
    )
  }

  else{
    this.router.navigate(['/login'])
  }

}


}
