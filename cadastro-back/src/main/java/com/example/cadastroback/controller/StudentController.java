package com.example.cadastroback.controller;

import com.example.cadastroback.dto.ReturnMessage;
import com.example.cadastroback.dto.StudentDTO;
import com.example.cadastroback.dto.StudentSubscriptionDTO;
import com.example.cadastroback.model.StudentModel;
import com.example.cadastroback.service.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping(value = "/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllStudents(
            @RequestParam int page,
            @RequestParam int size
    ) {
        return studentService.listStudents(page,size);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<StudentModel> findStudentById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(studentService.findStudentById(id));
    }

    @PostMapping
    public ResponseEntity<StudentModel> saveStudent(@Valid @RequestBody StudentSubscriptionDTO student) {
        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.saveStudent(student));
    }

    @PutMapping
    public ResponseEntity<StudentModel> editStudent(@Valid @RequestBody StudentDTO student) {
        return ResponseEntity.status(HttpStatus.OK).body(studentService.editStudent(student));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<ReturnMessage> deleteStudent(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(studentService.deleteStudent(id));
    }
}

