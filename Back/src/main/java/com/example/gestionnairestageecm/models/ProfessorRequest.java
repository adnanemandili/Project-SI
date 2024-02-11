package com.example.gestionnairestageecm.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfessorRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private String address;
    private String city;
    private int postalCode;
    private String schoolPhoneNumber;
    private String phoneNumber;
    private LocalDate hiringDate;
    private LocalDate leavingDate;

}