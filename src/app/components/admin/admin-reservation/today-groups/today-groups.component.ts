import { GroupService } from './../../../../../services/group.service';
import { HttpClient } from '@angular/common/http';
import { ICourse } from 'src/models/interfaces/icourse';
import { Component, OnInit } from '@angular/core';

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
  constructor(private _http: HttpClient, private _groupService: GroupService) { }

  ngOnInit(): void {
    this._http.get('http://127.0.0.1:8000/today-groups').subscribe((res) => {
      this.groups = <ICourse[]>res;
    },
      (err) => {
        console.log(err);
      })
  }
  sendMails(gid: any) {
    this._groupService.getGroup(gid).subscribe((res) => {
      console.log();

      const formData = new FormData();
      formData.append('group_id', gid)
      formData.append('user_id', res.teacher.user)
      formData.append('url', this.url)


      this._http.post('http://127.0.0.1:8000/send-urls', formData).subscribe((res) => {

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
