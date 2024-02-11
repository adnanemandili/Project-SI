package com.example.gestionnairestageecm.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="tuteurs")
public class Tutor {

    @Id
    @GeneratedValue
    @Column(name = "numero_tuteur", nullable = false)
    private Long tutorNumber;

    @Column(name = "prenom", nullable = false)
    private String firstName;

    @Column(name = "nom", nullable = false)
    private String lastName;

    
    @Column(name = "sexe", nullable = false)
    private String gender;

    @Column(name = "telephone_tuteur", nullable = false)
    private String tutorPhoneNumber;

    @Column(name = "numero_siret", nullable = false)
    private Long siretNumber;


    public Tutor (
        String firstName,
        String lastName,
        String gender,
        String tutorPhoneNumber,
        Long siretNumber
    ){
        this.firstName=firstName;
        this.lastName=lastName;
        this.gender=gender;
        this.tutorPhoneNumber=tutorPhoneNumber;
        this.siretNumber=siretNumber;

    }
    
}
