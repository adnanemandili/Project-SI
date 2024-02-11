package com.example.gestionnairestageecm.controllers;

import com.example.gestionnairestageecm.models.Skill;
import com.example.gestionnairestageecm.models.SkillRequest;
import com.example.gestionnairestageecm.services.SkillService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/api/v1/skills")
@RestController
@AllArgsConstructor
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping("/list")
    public List<Skill> getAllSkills() {
        return skillService.getAllSkills();
    }

    @GetMapping("/number={skillNumber}")
    public Skill getSkillById(@PathVariable Long skillNumber) {
        return skillService.getSkillBySkillNumber(skillNumber);
    }

    @GetMapping("/code={code}")
    public Skill getSkillByCode(@PathVariable String code) {
        return skillService.getSkillByCode(code);
    }

    @GetMapping("/label={label}")
    public Skill getSkillByLabel(@PathVariable String label) {
        return skillService.getSkillByLabel(label);
    }

    @PostMapping("/new")
    public void saveSkill(@RequestBody SkillRequest skillRequest) {
        Skill skill = new Skill(
                skillRequest.getCode(),
                skillRequest.getLabel(),
                skillRequest.getDescription()
        );
        skillService.saveSkill(skill);
    }

    @PutMapping("/update/number={skillNumber}")
    public void updateSkill(@PathVariable Long skillNumber, @RequestBody SkillRequest newSkill) {
        skillService.updateSkill(skillNumber, newSkill);
    }

    @DeleteMapping("/delete/number={skillNumber}")
    public void deleteSkill(@PathVariable Long skillNumber) {
        skillService.deleteSkill(skillNumber);
    } 
    
}
