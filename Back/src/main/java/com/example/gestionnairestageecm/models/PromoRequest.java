package com.example.gestionnairestageecm.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PromoRequest {

    private int year;
    private long professorId;
    private int registredNumber;
    private int receiptsNumber;
}