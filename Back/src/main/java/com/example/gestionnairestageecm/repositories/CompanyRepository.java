package com.example.gestionnairestageecm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.gestionnairestageecm.models.Company;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Optional<Company> findBySiretNumber(Long siretNumber);

    Optional<Company> findByBusinessName(String businessName);
}