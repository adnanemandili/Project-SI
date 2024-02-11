package com.example.gestionnairestageecm.services;

import com.example.gestionnairestageecm.models.InternshipDate;
import com.example.gestionnairestageecm.models.InternshipDateRequest;
import com.example.gestionnairestageecm.repositories.InternshipDateRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class InternshipDateService {
    private InternshipDateRepository internshipDateRepository;

    public List<InternshipDate> getAllInternshipsDates(){ return internshipDateRepository.findAll();}
    public InternshipDate getInternshipDateById(Long internshipDateId) {
        return internshipDateRepository.findById(internshipDateId).get();
    }

    public InternshipDate saveInternshipDate(InternshipDate internshipDate) {
        return internshipDateRepository.save(internshipDate);
    }

    public InternshipDate updateInternshipDate(Long internshipId, InternshipDateRequest newInternship) {
        InternshipDate internshipDate = internshipDateRepository.findById(internshipId).get();
        internshipDate.setInternshipType(newInternship.getInternshipType());
        internshipDate.setYear(newInternship.getYear());
        internshipDate.setStartDate(newInternship.getStartDate());
        internshipDate.setEndDate(newInternship.getEndDate());
        return internshipDateRepository.save(internshipDate);
    }

    public void deleteInternshipDate(Long internshipDateId) {
        internshipDateRepository.deleteById(internshipDateId);
    }
}
