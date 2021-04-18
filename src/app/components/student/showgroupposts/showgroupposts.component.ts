import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICourse } from 'src/models/interfaces/icourse';
import { Ipost } from 'src/models/interfaces/ipost';
import { GroupService } from 'src/services/group.service';

@Component({
  selector: 'app-showgroupposts',
  templateUrl: './showgroupposts.component.html',
  styleUrls: ['./showgroupposts.component.css']
})
export class ShowgrouppostsComponent implements OnInit {
  group_posts:Ipost[]
  posts:any
  group:ICourse|any
  id:number
  constructor(private _post: GroupService,private _activatedRoute:ActivatedRoute) {
    this.group_posts=[{title:" " ,content:" "},]
    this.id=NaN
  
   }
    
  ngOnInit(): void {
    this.id=this._activatedRoute.snapshot.params['id']
    this._post.getGroup(this.id).subscribe(res=>this.group=res,err=>console.log(err))
    this._post.get_posts_for_group(this.id).subscribe(res=>this.posts=res,err=>console.log(err))
  }

}
