package com.example.gestionnairestageecm.models;

import com.example.gestionnairestageecm.enumerations.InternshipType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "stages")
public class Internship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_stage",nullable = false)
    private Long internshipId;
    @Column(name = "promo",nullable = false)
    private int promo;
    @Column(name = "numero_promo",nullable = false)
    private String promoNumber;
    @Column(name = "professeur",nullable = false)
    private Long professorId;
    @Column(name = "tuteur",nullable = false)
    private Long tutorNumber;
    @Column(name = "entreprise",nullable = false)
    private Long siretNumber;
    @Column(name = "type_stage",nullable = false)
    private int internshipType;
    @Column(name = "annee_stage",nullable = false)
    private int year;
    @Column(name = "appreciation")
    private String appreciation;

    public Internship(int promo, String promoNumber, Long professorId, Long tutorNumber, Long siretNumber, int internshipType, int year, String appreciation) {
        this.promo = promo;
        this.promoNumber = promoNumber;
        this.professorId = professorId;
        this.tutorNumber = tutorNumber;
        this.siretNumber = siretNumber;
        this.internshipType = internshipType;
        this.year = year;
        this.appreciation = appreciation;
    }
}
