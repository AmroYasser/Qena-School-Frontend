import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  post_title: string
  post_content: string
  group_id: number
  groups: any
  // postForm: FormGroup | undefined

  constructor(private _group: GroupService, private _router: Router, private _groups: CoursesService) {
    this.post = {
      title: '', content: '', group: null
    }
    this.post_content = ''
    this.post_title = ''
    this.group_id = 0
  }

  ngOnInit(): void {
    this._groups.getAllCourses().subscribe((res) => {
      this.groups = res
    },
      (err) => {
        console.log(err)
      })
  }

  addPost() {
    this.post = {
      title: this.post_title, content: this.post_content, group: this.group_id
    }
    this._group.addPost(this.post).subscribe((data) => {
      this._router.navigateByUrl(`/tgroup/${this.group_id}`);
    }, (err) => console.log(err))
  }

}
