import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { faPortrait } from '@fortawesome/free-solid-svg-icons';
import { StudentService } from './../../services/student.service';
import { Student, SubscribedStudent } from './../../domain/Student';
import { ReturnMessage } from './../../domain/Message';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  private studentId = 0;

  public title = '';
  public faPortrait = faPortrait;
  public imgFile: any;
  public isNewStudent = true;
  public loading = false;
  public student: Student = {
    name: '',
    address: '',
    photo: [],
  };

  constructor(
    private sharedService: SharedService,
    private toasterService: ToastrService,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.title = this.sharedService.SECTION_TITLE;

    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.studentId = params.id;
        this.isNewStudent = false;
        this.loading = true;
        this.studentService.findStudentById(params.id).subscribe(
          (student: Student) => {
            this.loading = false;
            if (student.photo?.photo) {
              student.photo.photo = `data:image/jpg;base64,${student.photo?.photo}`;
              this.student.photo = [student.photo];
            }

            this.student.name = student.name;
            this.student.address = student.address;
          },
          (e) => {
            this.loading = false;
            this.toasterService.error(e.error.message, 'Erro!');
          },
        );
      }
    });
  }

  addPhoto(evt: any): void {
    const fileData = evt.target.files[0];
    this.student.photo.push(fileData);
    const reader = new FileReader();
    const that = this;
    reader.onload = function (fileLoadedEvent) {
      return (that.imgFile = fileLoadedEvent.target?.result);
    };

    reader.readAsDataURL(fileData);
  }

  deletePhoto(): void {
    if (!this.isNewStudent) {
      this.loading = true;

      this.studentService.deletePhoto(this.studentId).subscribe(
        (retMessage: ReturnMessage) => {
          this.loading = false;
          this.toasterService.success(retMessage.message);
        },
        (e) => {
          this.loading = false;
          this.toasterService.error(e.error.message, 'Erro!');
        },
      );
    }

    this.student.photo = [];
  }

  convertPhotoToUpload(file: File): FormData {
    const formData = new FormData();
    formData.append('photo', file);
    return formData;
  }

  savePhoto(studentId: number): void {
    const payload = this.convertPhotoToUpload(this.student.photo[0]);

    this.loading = true;
    this.studentService.savePhoto(payload, studentId).subscribe(
      () => {
        this.loading = false;
      },
      (e) => {
        this.loading = false;
        this.toasterService.error(e.error.message, 'Erro!');
      },
    );
  }

  resetStudent(): void {
    this.student = {
      name: '',
      address: '',
    };
    this.deletePhoto();
  }

  saveStudent(): void {
    const payload = {
      name: this.student.name,
      address: this.student.address,
    };

    this.loading = true;
    this.studentService.saveStudent(payload).subscribe(
      (student: SubscribedStudent) => {
        if (this.student?.photo.length && student.id) {
          this.savePhoto(student.id);
        }

        const firstName = student.name.split(' ')[0];
        this.loading = false;
        this.resetStudent();
        this.toasterService.success(
          `O cadastro de ${firstName} foi realizado com sucesso`,
        );
      },
      (e) => {
        this.loading = false;
        this.toasterService.error(e.error.message, 'Erro!');
      },
    );
  }

  updateStudent(): void {
    const payload = {
      id: this.studentId,
      name: this.student.name,
      address: this.student.address,
    };

    this.loading = true;
    this.studentService.editStudent(payload).subscribe(
      (student: Student) => {
        if (this.student?.photo.length && this.studentId) {
          this.savePhoto(this.studentId);
        }

        const firstName = student.name.split(' ')[0];
        this.loading = false;
        this.toasterService.success(
          `O cadastro de ${firstName} foi atualizado com sucesso`,
        );

        this.router.navigate(['/students/list']);
      },
      (e) => {
        this.loading = false;
        this.toasterService.error(e.error.message, 'Erro!');
      },
    );
  }
}
