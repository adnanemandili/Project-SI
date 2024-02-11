package com.example.gestionnairestageecm.controllers;

import java.util.List;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.gestionnairestageecm.models.Student;
import com.example.gestionnairestageecm.models.StudentRequest;
import com.example.gestionnairestageecm.services.StudentService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;




@RequestMapping("/api/v1/students")
@RestController
@AllArgsConstructor
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/list")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @GetMapping("/id={studentId}")
    public Student getStudentById(@PathVariable Long studentId) {
        return studentService.getStudentById(studentId);
    }

    @GetMapping("/email={email}")
    public Student getStudentByEmail(@PathVariable String email) {
        return studentService.getStudentByEmail(email);
    }

    @GetMapping("/name={firstName}+{lastName}")
    public Student getStudentByName(@PathVariable String firstName, @PathVariable String lastName) {
        return studentService.getStudentByFirstNameAndLastName(firstName, lastName);
    }

    @GetMapping("/promo={promo}&promoNumber={promoNumber}")
    public Student getStudentByPromoAndPromoNumber(@PathVariable int promo, @PathVariable String promoNumber) {
        return studentService.getStudentByPromoAndPromoNumber(promo, promoNumber);
    }

    @PostMapping("/new")
    public void saveStudent(@RequestBody StudentRequest studentRequest) {
       Student student = new Student(
        studentRequest.getFirstName(),
        studentRequest.getLastName(),
        studentRequest.getEmail(),
        studentRequest.getGender(),
        studentRequest.getDateOfBirth(),
        studentRequest.getAddress(),
        studentRequest.getCity(),
        studentRequest.getPostalCode(),
        studentRequest.getPhoneNumber(),
        studentRequest.getPromo(),
        studentRequest.getPromoNumber(),
        studentRequest.getMention()
       );
       studentService.saveStudent(student);

    }
     
    


    @PutMapping("/update/id={studentId}")
    public void updateStudent(@PathVariable Long studentId, @RequestBody StudentRequest newStudent) {
        studentService.updateStudent(studentId, newStudent);
    }

    @DeleteMapping("/delete/id={studentId}")
    public void deleteStudent(@PathVariable Long studentId) {
        studentService.deleteStudent(studentId);
    } 
    
}
