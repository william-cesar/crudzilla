export interface Student {
  name: string;
  address: string;
  photo?: any | Photo;
}

export interface SubscribedStudent {
  id: number;
  name: string;
  address: string;
  photo?: any | Photo;
}

export interface PageableStudents {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  students: SubscribedStudent[];
}

export interface Photo {
  studentId: number;
  photo: string;
}
