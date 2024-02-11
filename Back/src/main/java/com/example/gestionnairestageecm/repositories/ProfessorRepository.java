package com.example.gestionnairestageecm.repositories;

import com.example.gestionnairestageecm.models.Professor;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


public interface ProfessorRepository extends JpaRepository<Professor,Long> {
    
    Optional<Professor> findByEmail(String email);

    Optional<Professor> findByFirstNameAndLastName(String firstName, String lastName);
}