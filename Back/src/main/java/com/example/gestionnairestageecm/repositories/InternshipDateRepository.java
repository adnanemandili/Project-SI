package com.example.gestionnairestageecm.repositories;

import com.example.gestionnairestageecm.models.InternshipDate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InternshipDateRepository extends JpaRepository<InternshipDate,Long> {

}
