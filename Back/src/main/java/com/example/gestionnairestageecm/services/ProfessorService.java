package com.example.gestionnairestageecm.services;

import java.util.List;

import com.example.gestionnairestageecm.models.ProfessorRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gestionnairestageecm.models.Professor;
import com.example.gestionnairestageecm.repositories.ProfessorRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProfessorService {
    
    @Autowired
    private final ProfessorRepository professorRepository;

    public List<Professor> getAllProfessors() {
        return professorRepository.findAll();
    }

    public Professor getProfessorById(Long professorId) {
        return professorRepository.findById(professorId).get();
    }

    public Professor getProfessorByFirstNameAndLastName(String firstName, String lastName) {
        return professorRepository.findByFirstNameAndLastName(firstName, lastName).get();
    }

    public Professor saveProfessor(Professor professor) {
        return professorRepository.save(professor);
    }

    public Professor updateProfessor(Long professorId, ProfessorRequest newProfessor) {
        Professor professor = professorRepository.findById(professorId).get();
        professor.setFirstName(newProfessor.getFirstName());
        professor.setLastName(newProfessor.getLastName());
        professor.setCity(newProfessor.getCity());
        professor.setAddress(newProfessor.getAddress());
        professor.setGender(newProfessor.getGender());
        professor.setSchoolPhoneNumber(newProfessor.getSchoolPhoneNumber());
        professor.setPhoneNumber(newProfessor.getPhoneNumber());
        professor.setPostalCode(newProfessor.getPostalCode());
        professor.setHiringDate(newProfessor.getHiringDate());
        professor.setLeavingDate(newProfessor.getLeavingDate());
        return professorRepository.save(professor);
    }

    public void deleteProfessor(Long professorId) {
        professorRepository.deleteById(professorId);
    }

}