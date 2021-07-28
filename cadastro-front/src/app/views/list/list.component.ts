import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageableStudents } from './../../domain/Student';
import { StudentService } from './../../services/student.service';
import { SharedService } from './../../services/shared.service';
import { ReturnMessage } from './../../domain/Message';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @ViewChild('confirmation')
  confirmation!: ElementRef;

  public studentsList: PageableStudents = {
    currentPage: 0,
    totalItems: 0,
    totalPages: 0,
    students: [],
  };

  public faEdit = faEdit;
  public faTrash = faTrash;
  public studentId = 0;
  public loading = false;
  public title = '';
  public pageSize = 5;

  constructor(
    public studentService: StudentService,
    private sharedService: SharedService,
    private modalService: NgbModal,
    private toasterService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.title = this.sharedService.SECTION_TITLE;

    this.loading = true;
    this.studentService.listStudents(0, this.pageSize).subscribe(
      (pageable: PageableStudents) => {
        this.loading = false;
        this.studentsList = pageable;
      },
      () => {
        this.loading = false;
        this.toasterService.error(
          'Não foi possível carregar a listagem de alunos. Tente novamente.',
          'Erro!',
        );
      },
    );
  }

  displayModal(studentId: number): void {
    this.studentId = studentId;
    this.modalService.open(this.confirmation, { centered: true });
  }

  deleteStudent(): void {
    this.loading = true;
    this.studentService.deleteStudent(this.studentId).subscribe(
      (successMessage: ReturnMessage) => {
        this.loading = false;
        this.modalService.dismissAll();
        this.toasterService.success(successMessage.message);
        this.ngOnInit();
      },
      (e) => {
        this.loading = false;
        this.modalService.dismissAll();
        this.toasterService.error(e.error.message, 'Erro!');
      },
    );
  }
  changePage(page: number) {
    this.loading = true;
    this.studentService.listStudents(page - 1, this.pageSize).subscribe(
      (pageable: PageableStudents) => {
        this.loading = false;
        this.studentsList = pageable;
      },
      () => {
        this.loading = false;
        this.toasterService.error(
          'Não foi possível carregar a listagem de alunos. Tente novamente.',
          'Erro!',
        );
      },
    );
  }
}
