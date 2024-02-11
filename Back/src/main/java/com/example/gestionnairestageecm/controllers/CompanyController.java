package com.example.gestionnairestageecm.controllers;

import java.util.List;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.gestionnairestageecm.models.Company;
import com.example.gestionnairestageecm.services.CompanyService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RequestMapping("/api/v1/companies")
@RestController
@AllArgsConstructor
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping("/list")
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @GetMapping("/siret={siretNumber}")
    public Company getCompanyBySiretNumber(@PathVariable Long siretNumber) {
        return companyService.getCompanyBySiretNumber(siretNumber);
    }

    @GetMapping("/name={businessName}")
    public Company getCompanyByBusinessName(@PathVariable String businessName) {
        return companyService.getCompanyByBusinessName(businessName);
    }

    @PostMapping("/new")
    public Company saveCompany(@RequestBody Company company) {
        return companyService.saveCompany(company);
    }

    @PutMapping("/update/siret={siretNumber}")
    public Company updateCompany(@PathVariable Long siretNumber, @RequestBody Company newCompany) {
        return companyService.updateCompany(siretNumber, newCompany);
    }

    @DeleteMapping("/delete/siret={siretNumber}")
    public void deleteCompany(@PathVariable Long siretNumber) {
        companyService.deleteCompany(siretNumber);
    }
    
}
