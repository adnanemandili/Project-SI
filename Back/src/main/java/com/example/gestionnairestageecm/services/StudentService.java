package com.example.gestionnairestageecm.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gestionnairestageecm.models.Student;
import com.example.gestionnairestageecm.models.StudentRequest;
import com.example.gestionnairestageecm.repositories.StudentRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StudentService {

    @Autowired
    private StudentRepository studentRepository; 
    
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long studentId) {
        return studentRepository.findById(studentId).get();
    }

    public Student getStudentByEmail(String email) {
        return studentRepository.findByEmail(email).get();
    }

    public Student getStudentByFirstNameAndLastName(String firstName, String lastName) {
        return studentRepository.findByFirstNameAndLastName(firstName, lastName).get();
    }

    public Student getStudentByPromoAndPromoNumber(int promo, String promoNumber) {
        return  studentRepository.findByPromoAndPromoNumber(promo, promoNumber).get();
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudent(Long studentId, StudentRequest newStudent) {
        Student student = studentRepository.findById(studentId).get();
        student.setFirstName(newStudent.getFirstName());
        student.setLastName(newStudent.getLastName());
        student.setEmail(newStudent.getEmail());
        student.setGender(newStudent.getGender());
        student.setDateOfBirth(newStudent.getDateOfBirth());
        student.setAddress(newStudent.getAddress());
        student.setCity(newStudent.getCity());
        student.setPostalCode(newStudent.getPostalCode());
        student.setPhoneNumber(newStudent.getPhoneNumber());
        student.setPromo(newStudent.getPromo());
        student.setPromoNumber(newStudent.getPromoNumber());
        student.setMention(newStudent.getMention());
        return studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        studentRepository.deleteById(studentId);
    }

    public void saveStudent(StudentRequest studentRequest) {
    }
}
