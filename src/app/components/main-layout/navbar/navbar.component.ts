import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/models/interfaces/iuser';
import { LoginserviceService } from 'src/services/loginservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 user:IUser|any
  constructor(public loginserv:LoginserviceService) { 
   
  }

  ngOnInit(): void {
    // this.loginserv.get_user().subscribe((res)=>{
    //   this.user=res //to get current logged in user
    //   this.loginserv.is_logged=true
    //   console.log(this.user)
    // },(err)=>
    // {
    //   console.log(err)
    //   this.loginserv.is_logged=false
    
    // }
    // )

  }

}
