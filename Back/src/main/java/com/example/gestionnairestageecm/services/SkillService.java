package com.example.gestionnairestageecm.services;

import com.example.gestionnairestageecm.models.Skill;
import com.example.gestionnairestageecm.models.SkillRequest;
import com.example.gestionnairestageecm.repositories.SkillRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SkillService {
    
    @Autowired
    private SkillRepository skillRepository;

    public Skill getSkillBySkillNumber(Long skillNumber) {
        return skillRepository.findById(skillNumber).get();
    }

    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }

    public Skill getSkillByCode(String code) {
        return skillRepository.findByCode(code).get();
    }

    public Skill getSkillByLabel(String label) {
        return skillRepository.findByLabel(label).get();
    }

    public Skill saveSkill(Skill skill) {
        return skillRepository.save(skill);
    }

    public Skill updateSkill(Long skillNumber, SkillRequest newSkill) {
        Skill skill = skillRepository.findById(skillNumber).get();
        skill.setCode(newSkill.getCode());
        skill.setLabel(newSkill.getLabel());
        skill.setDescription(newSkill.getDescription());
        return skillRepository.save(skill);
    }

    public void deleteSkill(Long skillNumber) {
        skillRepository.deleteById(skillNumber);
    }

}
