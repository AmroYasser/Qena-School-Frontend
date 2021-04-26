import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  constructor(private _group: GroupService, private _router: Router, private route: ActivatedRoute) {
    this.post = {
      title: '', content: '', group_pk: 0
    }
    this.post_content = ''
    this.post_title = ''
    this.group_id = route.snapshot.params.id
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

}
