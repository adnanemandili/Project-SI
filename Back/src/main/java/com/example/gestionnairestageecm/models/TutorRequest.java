package com.example.gestionnairestageecm.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TutorRequest {

    private String firstName;
    private String lastName;
    private String gender;
    private String tutorPhoneNumber;
    private Long siretNumber;

}
