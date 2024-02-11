package com.example.gestionnairestageecm.models;

import java.time.LocalDate;

import com.example.gestionnairestageecm.enumerations.InternshipType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "dates_stages")
public class InternshipDate {

    @Id
    @GeneratedValue
    @Column(name = "date_stage_id", nullable = false)
    private Long internshipDateId;

    @Column(name = "type_stage", nullable = false)
    private int internshipType;

    @Column(name = "annee", nullable = false)
    private int year;

    @Column(name = "date_debut", nullable = false)
    private LocalDate startDate;

    @Column(name = "date_fin", nullable = false)
    private LocalDate endDate;

    public InternshipDate(int internshipType, int year, LocalDate startDate, LocalDate endDate) {
        this.internshipType = internshipType;
        this.year = year;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
