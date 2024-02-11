package com.example.gestionnairestageecm.models;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@AllArgsConstructor
public class StudentRequest {
   
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private LocalDate dateOfBirth;
    private String address;
    private String city;
    private int postalCode;
    private String phoneNumber;
    private int promo;
    private String promoNumber;
    private String mention;
    
    
}
