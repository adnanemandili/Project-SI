package com.example.gestionnairestageecm.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "competences")
public class Skill {

    @Id
    @GeneratedValue
    @Column(name = "numero_competence", nullable = false)
    private Long skillNumber;

    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "libelle", nullable = false)
    private String label;

    @Column(name = "description", nullable = false)
    private String description;

    public Skill(String code, String label, String description) {
        this.code = code;
        this.label = label;
        this.description = description;
    }
}
