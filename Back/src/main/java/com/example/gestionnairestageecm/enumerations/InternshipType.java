package com.example.gestionnairestageecm.enumerations;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum InternshipType {

    FIRST_YEAR( 11,"Stage 1A", 4),
    SECOND_YEAR_1ST( 21, "1er Stage 2A", 4),
    SECOND_YEAR_2ND( 22, "2eme Stage 2A", 8),
    THIRD_YEAR_1ST( 31, "1er Stage 3A", 2),
    THIRD_YEAR_2ND( 32, "2eme Stage 3A", 12);

    private int typeCode;
    private String label;
    private int weeksNumber;
}


