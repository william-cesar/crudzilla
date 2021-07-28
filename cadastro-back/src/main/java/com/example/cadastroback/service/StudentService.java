package com.example.cadastroback.service;

import com.example.cadastroback.dto.ReturnMessage;
import com.example.cadastroback.dto.StudentDTO;
import com.example.cadastroback.dto.StudentSubscriptionDTO;
import com.example.cadastroback.exceptions.CustomNotFoundException;
import com.example.cadastroback.model.PhotoModel;
import com.example.cadastroback.model.StudentModel;
import com.example.cadastroback.repository.PhotoRepository;
import com.example.cadastroback.repository.StudentRepository;
import com.example.cadastroback.utils.Messages;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final PhotoRepository photoRepository;

    public StudentService(StudentRepository studentRepository, PhotoRepository photoRepository) {
        this.studentRepository = studentRepository;
        this.photoRepository = photoRepository;
    }

    @Transactional
    public StudentModel saveStudent(StudentSubscriptionDTO studentSubscriptionDTO) {

        StudentModel student = new StudentModel();
        student.setName(studentSubscriptionDTO.getName());
        student.setAddress(studentSubscriptionDTO.getAddress());

        return studentRepository.save(student);
    }

    @Transactional
    public ResponseEntity<Map<String, Object>> listStudents(int page, int size) {

        try {
            List<StudentModel> students;
            Pageable paging = PageRequest.of(page, size, Sort.by("id").descending());

            Page<StudentModel> pageStudents;
            pageStudents = studentRepository.findAll(paging);

            students = pageStudents.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("students", students);
            response.put("currentPage", pageStudents.getNumber() + 1);
            response.put("totalItems", pageStudents.getTotalElements());
            response.put("totalPages", pageStudents.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    public StudentModel editStudent(StudentDTO studentDTO) {

        studentRepository.findById(studentDTO.getId())
                .orElseThrow(() -> new CustomNotFoundException(Messages.STUDENT_NOT_FOUND));

        StudentModel student = new StudentModel();
        student.setId(studentDTO.getId());
        student.setName(studentDTO.getName());
        student.setAddress(studentDTO.getAddress());

        return studentRepository.save(student);
    }

    @Transactional
    public ReturnMessage deleteStudent(Long id) {

        studentRepository.findById(id)
                .orElseThrow(() -> new CustomNotFoundException(Messages.STUDENT_NOT_FOUND));

        Optional<PhotoModel> photo = photoRepository.findByStudentId(id);

        if (photo.isPresent()) {
            photoRepository.deleteById(id);
        }

        studentRepository.deleteById(id);

        ReturnMessage message = new ReturnMessage();
        message.setMessage(Messages.REMOVED_STUDENT);

        return message;
    }

    @Transactional
    public StudentModel findStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new CustomNotFoundException(Messages.STUDENT_NOT_FOUND));
    }
}
