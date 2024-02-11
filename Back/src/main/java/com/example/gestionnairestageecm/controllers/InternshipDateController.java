package com.example.gestionnairestageecm.controllers;

import com.example.gestionnairestageecm.models.InternshipDate;
import com.example.gestionnairestageecm.models.InternshipDateRequest;
import com.example.gestionnairestageecm.services.InternshipDateService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/internships-dates")
public class InternshipDateController {

    private InternshipDateService internshipDateService;

    @GetMapping("/list")
    public List<InternshipDate> getAllInternshipsDates() {
        return internshipDateService.getAllInternshipsDates();
    }

    @GetMapping("/id={internshipDateId}")
    public InternshipDate getInternshipById(@PathVariable Long internshipDateId) {
        return internshipDateService.getInternshipDateById(internshipDateId);
    }

    @PutMapping("/update/id={internshipDateId}")
    public void updateInternshipDate(@PathVariable Long internshipDateId, @RequestBody InternshipDateRequest newInternshipDateRequest) {
        internshipDateService.updateInternshipDate(internshipDateId, newInternshipDateRequest);
    }

    @PostMapping("/new")
    public void saveInternship(@RequestBody InternshipDateRequest internshipDateRequest) {
        InternshipDate internshipDate = new InternshipDate(
                internshipDateRequest.getInternshipType(),
                internshipDateRequest.getYear(),
                internshipDateRequest.getStartDate(),
                internshipDateRequest.getEndDate()
        );
        System.out.println(internshipDate);
        internshipDateService.saveInternshipDate(internshipDate);
    }

    @DeleteMapping("/delete/id={internshipDateId}")
    public void deleteInternship(@PathVariable Long internshipDateId) {
        internshipDateService.deleteInternshipDate(internshipDateId);
    }
}
