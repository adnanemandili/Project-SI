package com.example.gestionnairestageecm.repositories;

import com.example.gestionnairestageecm.models.Internship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InternshipRepository extends JpaRepository<Internship,Long> {
    Optional<Internship> findByProfessorIdAndTutorNumber(Long professorId,Long tutorNumber);
    List<Internship> findBySiretNumber(Long siretNumber);
}
