import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: 'http://localhost:3000/api'
  });

  name: '';

  feedback: string;

  students: any;

  constructor(
    private studentService: StudentService
  ) {}

  ngOnInit () {
    this.studentService.getAll()
      .then((results) => {
        this.students = results;
      });

    this.uploader.onSuccessItem = (item, response) => {
      this.studentService.getAll()
      .then((results) => {
        this.students = results;
      });
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }

  submitForm(form) {
    if (form.valid) {
      this.uploader.onBuildItemForm = (item, form2) => {
        form2.append('name', this.name);
      };
    }
    this.uploader.uploadAll();
  }
}
