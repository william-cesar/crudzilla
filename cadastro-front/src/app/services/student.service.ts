import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Photo,
  Student,
  SubscribedStudent,
  PageableStudents,
} from './../domain/Student';
import { ReturnMessage } from './../domain/Message';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private STUDENTS_URL = '/api/students';
  private PHOTO_URL = '/api/photos';

  constructor(private http: HttpClient) {}

  listStudents(page: number, size: number): Observable<PageableStudents> {
    return this.http.get<PageableStudents>(
      `${this.STUDENTS_URL}?page=${page}&size=${size}`,
    );
  }

  findStudentById(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${this.STUDENTS_URL}/${studentId}`);
  }

  saveStudent(payload: Student): Observable<SubscribedStudent> {
    return this.http.post<SubscribedStudent>(this.STUDENTS_URL, payload);
  }

  editStudent(payload: SubscribedStudent): Observable<SubscribedStudent> {
    return this.http.put<SubscribedStudent>(this.STUDENTS_URL, payload);
  }

  deleteStudent(studentId: number): Observable<ReturnMessage> {
    return this.http.delete<ReturnMessage>(`${this.STUDENTS_URL}/${studentId}`);
  }

  savePhoto(payload: FormData, studentId: number): Observable<Photo> {
    return this.http.post<Photo>(`${this.PHOTO_URL}/${studentId}`, payload);
  }

  deletePhoto(studentId: number): Observable<ReturnMessage> {
    return this.http.delete<ReturnMessage>(`${this.PHOTO_URL}/${studentId}`);
  }
}
