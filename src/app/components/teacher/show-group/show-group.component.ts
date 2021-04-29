import { Time } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ipost } from 'src/models/interfaces/ipost';
import { CoursesService } from 'src/services/courses.service';
import { GroupService } from 'src/services/group.service';

@Component({
  selector: 'app-show-group',
  templateUrl: './show-group.component.html',
  styleUrls: ['./show-group.component.css']
})
export class ShowGroupComponent implements OnInit {
  post: Ipost
  posts: any
  post_title: string
  post_content: string
  group_id: number
  group: any = {}
  myform:FormGroup
  constructor(private _group: GroupService, private _router: Router, private route: ActivatedRoute, private fb:FormBuilder,
    private http:HttpClient) {
    this.post = {
      title: '', content: '', group_pk: 0
    }
    this.post_content = ''
    this.post_title = ''
    this.group_id = route.snapshot.params.id

    this.myform=this.fb.group({
      formNextSessionDate: ['', Validators.required],
      formNextSessionTime: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    this._group.getGroup(this.group_id).subscribe((data) => {
      this.group = data
      console.log(this.group);

    },
      (err) => console.log(err))

    this._group.get_posts_for_group(this.group_id).subscribe((data) => {
      this.posts = data
    }, (err) => console.log(err))
  }


  addPost() {
    this.post = {
      title: this.post_title, content: this.post_content, group_pk: this.group_id
    }
    this._group.addPost(this.post).subscribe((data) => {
      this._router.navigateByUrl(`/tgroup/${this.group_id}`);
      this._router.routeReuseStrategy.shouldReuseRoute = () => false;
      this._router.onSameUrlNavigation = 'reload';
      this._router.navigate(['./'], { relativeTo: this.route });
    }, (err) => console.log(err))

  }

  update_timedate(){
    console.log(this.group.id,"hgagy");
    
    // http://127.0.0.1:8000/course-group/
    const formDate=new FormData()
    formDate.append('next_session_date',this.myform.value.formNextSessionDate)
    formDate.append('next_session_time',this.myform.value.formNextSessionTime)
    this.http.patch(`http://127.0.0.1:8000/course-group/${this.group.id}/`,formDate).subscribe(
      (res)=>{
        
        this.post = {
          title: "تغيير موعد الحصة القادمة", content: ` تم تغير موعد الحصة القادمة الي ${this.myform.value.formNextSessionDate}
          الساعة ${this.myform.value.formNextSessionTime}`
          , group_pk: this.group_id
        }
        this._group.addPost(this.post).subscribe((data) => {
          this._router.navigateByUrl(`/tgroup/${this.group_id}`);
          this._router.routeReuseStrategy.shouldReuseRoute = () => false;
          this._router.onSameUrlNavigation = 'reload';
          this._router.navigate(['./'], { relativeTo: this.route });
        }, (err) => console.log(err))
        
      },
      (err)=>{
        console.log(err);
        
      }
    )

    
  }

// deletepost(post_id:number){
//   console.log(post_id);
    
//     this.http.delete(`http://127.0.0.1:8000/post/${post_id}/`).subscribe(
//       (res)=>{console.log("post deleted");
//       this._router.navigateByUrl(`/tgroup/${this.group_id}`);
//       this._router.routeReuseStrategy.shouldReuseRoute = () => false;
//       this._router.onSameUrlNavigation = 'reload';
//       this._router.navigate(['./'], { relativeTo: this.route });
//     },
//       err=>console.log(err)
      
      
//     )
//   }

}
