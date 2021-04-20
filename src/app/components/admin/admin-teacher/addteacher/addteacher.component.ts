import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Iteacher } from 'src/models/interfaces/iteacher';

@Component({
  selector: 'app-addteacher',
  templateUrl: './addteacher.component.html',
  styleUrls: ['./addteacher.component.css']
})
export class AddteacherComponent implements OnInit {
  // phone: string
  // name: string
  // description: string
  // teacher: Iteacher
  myForm: FormGroup
  image?: File | undefined | any
  // "img_avatar1.png"

  constructor(private _http: HttpClient, private _router: Router, private fb: FormBuilder) {
    // this.phone = ""
    // this.name = ""
    // this.description = ""

    // this.teacher = {
    //   name: "", phone: "", description: ""
    // };
    // this.image = null


    this.myForm = this.fb.group({
      formName: ['', [Validators.required, Validators.minLength(3)]],
      formDescription: ['', [Validators.required]],
      formPhone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    })
  }

  ngOnInit(): void {
  }


  onFileselected(event: any) {
    this.image = event.target.files[0]
    console.log(this.image)
    console.log(typeof this.image);
  }

  add_teacher() {
    console.log("in");
    // console.log(this.image);
    const formData = new FormData()
    formData.append('name', this.myForm.value.formName)
    formData.append('description', this.myForm.value.formDescription)
    formData.append('phone', this.myForm.value.formPhone)
    console.log("in 2");

    formData.append('image', this.image)

    // fetch(errimage.src)
    //   .then(res => res.blob())
    //   .then(blob => {
    //     this.image = new File([blob], 'img_avatar1.png', blob)
    //     console.log(this.image)
    //   })


    // formData.append('image', this.image)
    // if (this.image == undefined) {
    //   this.image = null;
    //   // new File(["image"], "assets/img_avatar1.png");
    //   formData.append('image', this.image)
    // }
    // else {
    //   formData.append('image', this.image, this.image.name)
    // }
    console.log(formData);
    this._http.post('http://127.0.0.1:8000/teacher/', formData,
      { responseType: 'text' }).subscribe(res => this._router.navigateByUrl('/manage-teachers'),
        err => console.log(err))
  }

}
