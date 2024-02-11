package com.example.gestionnairestageecm.repositories;

import com.example.gestionnairestageecm.models.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    Optional<Skill> findByCode(String code);
    Optional<Skill> findByLabel(String label);

}
