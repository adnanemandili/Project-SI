package com.example.gestionnairestageecm.repositories;

import com.example.gestionnairestageecm.models.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TutorRepository extends JpaRepository<Tutor, Long> {
    Optional<Tutor> findByFirstNameAndLastName(String firstName, String lastName);
}