package com.example.gestionnairestageecm.models;

import com.example.gestionnairestageecm.enumerations.InternshipType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
public class InternshipRequest {

    private int promo;
    private String promoNumber;
    private Long professorId;
    private Long tutorNumber;
    private Long siretNumber;
    private int internshipType;
    private int year;
    private String appreciation;

}
