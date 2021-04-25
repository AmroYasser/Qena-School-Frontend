import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitter } from 'src/app/components/Authentication/Emitters/emitter';
import { IAdmin } from 'src/models/interfaces/iadmin';

@Component({
  selector: 'app-manageadmin',
  templateUrl: './manageadmin.component.html',
  styleUrls: ['./manageadmin.component.css']
})
export class ManageadminComponent implements OnInit {
  admins:IAdmin|any
  constructor(private http:HttpClient,private _router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:8000/admins/').subscribe(res=>
    this.admins=res,
    err=>console.log(err)
    )
    console.log("befor");
    
    // Emitter.logged_id.subscribe(res=>console.log(res,"sdddddddd"))
    console.log("after");
    
    
  }

  deletea_admin(id:number){
    this.http.delete(`http://127.0.0.1:8000/admins/${id}`).subscribe((res)=>{
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['./'], { relativeTo: this.route });
    },
    
    err=>console.log("cannot")
    )

  }

}
