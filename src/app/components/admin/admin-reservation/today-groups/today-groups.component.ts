import { GroupService } from './../../../../../services/group.service';
import { HttpClient } from '@angular/common/http';
import { ICourse } from 'src/models/interfaces/icourse';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-today-groups',
  templateUrl: './today-groups.component.html',
  styleUrls: ['./today-groups.component.css']
})
export class TodayGroupsComponent implements OnInit {
  groups: ICourse[] = []
  group_id: number | any
  group: ICourse | any
  url: string | any

  constructor(private _http: HttpClient, private _groupService: GroupService,private _router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._http.get('http://127.0.0.1:8000/today-groups').subscribe((res) => {
      this.groups = <ICourse[]>res;
    },
      (err) => {
        console.log(err);
      })
  }
  sendMails(gid: any) {
    this._http.get(`http://127.0.0.1:8000/get-mems/${gid}`).subscribe((res)=>{
      console.log(res)
    }, (err)=> console.log(err))

    this._groupService.getGroup(gid).subscribe((res) => {
      let group=res
      console.log("group", gid);
      
      const formData = new FormData();
      formData.append('group_id', gid)
      formData.append('user_id', res.teacher.user)
      formData.append('url', url)


      this._http.post('http://127.0.0.1:8000/send-urls', formData).subscribe((res) => {
        const formD=new FormData()
        let session=<number>group.session_num-1
        formD.append('session_num',<any>session)
        this._http.patch(`http://127.0.0.1:8000/course-group/${gid}/`,formD).subscribe(
          (res)=>{
            console.log(res);
            this._router.routeReuseStrategy.shouldReuseRoute = () => false;
            this._router.onSameUrlNavigation = 'reload';
            this._router.navigate(['./'], { relativeTo: this.route });
          }
        )
      },
        (err) => {
          console.log(err);

        })
      this.group = res
    }, err => {
      console.log(err);
    })

  }

}
