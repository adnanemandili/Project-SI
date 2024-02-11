package com.example.gestionnairestageecm.controllers;

import com.example.gestionnairestageecm.models.Internship;
import com.example.gestionnairestageecm.models.InternshipRequest;
import com.example.gestionnairestageecm.services.InternshipService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/internships")
public class InternshipController{

    private InternshipService internshipService;

    @GetMapping("/list")
    public List<Internship> getAllInternships() {
        return internshipService.getAllInternships();
    }

    @GetMapping("/id={internshipId}")
    public Internship getInternshipById(@PathVariable Long internshipId) {
        return internshipService.getInternshipById(internshipId);
    }

    @GetMapping("/id={profId}&{tutorId}")
    public Internship getInternshipByProfIdAndTutorId(@PathVariable Long profId, @PathVariable Long tutorId ){
        return internshipService.getBeyProfIdAndTutorId(profId, tutorId);
    }

    @GetMapping("/siret={siretNumber}")
    public List<Internship> getInternshipsBySiretNumber(@PathVariable Long siretNumber){
        return internshipService.getBySiretNumber(siretNumber);
    }
    @PutMapping("/update/id={internshipId}")
    public void updateInternship(@PathVariable Long internshipId, @RequestBody InternshipRequest newInternship) {
        internshipService.updateInternship(internshipId, newInternship);
    }

    @PostMapping("/new")
    public void saveInternship(@RequestBody InternshipRequest internshipRequest) {
        Internship internship = new Internship(
                internshipRequest.getPromo(),
                internshipRequest.getPromoNumber(),
                internshipRequest.getProfessorId(),
                internshipRequest.getTutorNumber(),
                internshipRequest.getSiretNumber(),
                internshipRequest.getInternshipType(),
                internshipRequest.getYear(),
                internshipRequest.getAppreciation()
        );
        internshipService.saveInternship(internship);
    }

    @DeleteMapping("/delete/id={internshipId}")
    public void deleteInternship(@PathVariable Long internshipId) {
        internshipService.deleteInternship(internshipId);
    }
}
