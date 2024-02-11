package com.example.gestionnairestageecm.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.gestionnairestageecm.models.Company;
import com.example.gestionnairestageecm.repositories.CompanyRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository; 
    
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Company getCompanyBySiretNumber(Long siretNumber) {
        return companyRepository.findBySiretNumber(siretNumber).get();
    }

    public Company getCompanyByBusinessName(String businessName) {
        return companyRepository.findByBusinessName(businessName).get();
    }

    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    public Company updateCompany(Long siretNumber, Company newCompany) {
        companyRepository.deleteById(siretNumber);
        return companyRepository.save(newCompany);
    }

    public void deleteCompany(Long siretNumber) {
        companyRepository.deleteById(siretNumber);
    }
}
