package com.example.gestionnairestageecm.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "entreprises")
public class Company {

    @Id
    @Column(name = "numero_siret", nullable = false)
    private Long siretNumber;

    @Column(name = "forme_juridique", nullable = false)
    private String legalForm;
    
    @Column(name = "raison_sociale", nullable = false)
    private String businessName;

    @Column(name = "addresse", nullable = false)
    private String address;

    @Column(name = "ville", nullable = false)
    private String  city;

    @Column(name = "code_postal", nullable = false)
    private int postalCode;

    @Column(name = "telephone_tuteur", nullable = false)
    private String tutorPhoneNumber;
    
    @Column(name = "fax", nullable = false)
    private String fax;
    
    @Column(name = "contact", nullable = false)
    private String contact;
    
    @Column(name = "telephone_contact", nullable = false)
    private String contactPhoneNumber;

    @Column(name = "email", nullable = false)
    private String email;
}
