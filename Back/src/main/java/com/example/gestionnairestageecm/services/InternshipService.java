package com.example.gestionnairestageecm.services;

import com.example.gestionnairestageecm.models.Internship;
import com.example.gestionnairestageecm.models.InternshipRequest;
import com.example.gestionnairestageecm.models.Professor;
import com.example.gestionnairestageecm.repositories.InternshipRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@AllArgsConstructor
public class InternshipService {
    private InternshipRepository internshipRepository;

    public List<Internship> getAllInternships(){ return internshipRepository.findAll();}
    public Internship getInternshipById(Long internshipId) {
        return internshipRepository.findById(internshipId).get();
    }

    public Internship getBeyProfIdAndTutorId(Long profId,Long tutorId){
        return internshipRepository.findByProfessorIdAndTutorNumber(profId,tutorId).get();
    }

    public List<Internship> getBySiretNumber(Long siretNumber){
        return internshipRepository.findBySiretNumber(siretNumber);
    }
    public Internship saveInternship(Internship internship) {
        return internshipRepository.save(internship);
    }

    public Internship updateInternship(Long internshipId, InternshipRequest newInternship) {
        Internship internship = internshipRepository.findById(internshipId).get();
        internship.setInternshipType(newInternship.getInternshipType());
        internship.setPromoNumber(newInternship.getPromoNumber());
        internship.setPromo(newInternship.getPromo());
        internship.setProfessorId(newInternship.getProfessorId());
        internship.setSiretNumber(newInternship.getSiretNumber());
        internship.setTutorNumber(newInternship.getTutorNumber());
        internship.setAppreciation(newInternship.getAppreciation());
        internship.setYear(newInternship.getYear());
        return internshipRepository.save(internship);
    }

    public void deleteInternship(Long internshipId) {
        internshipRepository.deleteById(internshipId);
    }
}
