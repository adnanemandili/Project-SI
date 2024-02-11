package com.example.gestionnairestageecm.models;

import com.example.gestionnairestageecm.enumerations.InternshipType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class InternshipDateRequest {

    private int internshipType;
    private int year;
    private LocalDate startDate;
    private LocalDate endDate;
}
