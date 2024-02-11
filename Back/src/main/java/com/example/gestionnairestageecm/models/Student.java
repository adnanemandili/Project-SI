package com.example.gestionnairestageecm.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "etudiants")
public class Student {

    @Id
    @GeneratedValue
    @Column(name = "id_etudiant", nullable = false)
    private Long studentId;

    @Column(name = "prenom", nullable = false)
    private String firstName;

    @Column(name = "nom", nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String email;

    @Column(name = "sexe", nullable = false)
    private String gender;

    @Column(name = "date_naissance", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "adresse", nullable = false)
    private String address;

    @Column(name = "ville", nullable = false)
    private String city;

    @Column(name = "code_postal", nullable = false)
    private int postalCode;

    @Column(name = "telephone", nullable = false)
    private String phoneNumber;

    @Column(name = "promo", nullable = false)
    private int promo;

    @Column(name = "numero_promo", nullable = false)
    private String promoNumber;

    @Column(name = "mention")
    private String mention;
    
    public Student(
        String firstName,
        String lastName,
        String email,
        String gender,
        LocalDate dateOfBirth,
        String address,
        String city,
        int postalCode,
        String phoneNumber,
        int promo,
        String promoNumber,
        String mention
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.phoneNumber = phoneNumber;
        this.promo = promo;
        this.promoNumber = promoNumber;
        this.mention = mention;
    }
    
}
