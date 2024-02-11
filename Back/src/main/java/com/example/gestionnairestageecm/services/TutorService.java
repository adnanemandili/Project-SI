package com.example.gestionnairestageecm.services;

import com.example.gestionnairestageecm.models.Tutor;
import com.example.gestionnairestageecm.models.TutorRequest;
import com.example.gestionnairestageecm.repositories.TutorRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TutorService {

    @Autowired
    private TutorRepository tutorRepository; 
    
    public List<Tutor> getAllTutors() {
        return tutorRepository.findAll();
    }

    public Tutor getTutorById(Long tutorNumber) {
        return tutorRepository.findById(tutorNumber).get();
    }

    public Tutor getTutorByFirstNameAndLastName(String firstName, String lastName) {
        return tutorRepository.findByFirstNameAndLastName(firstName, lastName).get();
    }

    public Tutor saveTutor(Tutor Tutor) {
        return tutorRepository.save(Tutor);
    }

    public Tutor updateTutor(Long tutorNumber, TutorRequest newTutor) {
        Tutor tutor = tutorRepository.findById(tutorNumber).get();
        tutor.setFirstName(newTutor.getFirstName());
        tutor.setLastName(newTutor.getLastName());
        tutor.setGender(newTutor.getGender());
        tutor.setTutorPhoneNumber(newTutor.getTutorPhoneNumber());
        tutor.setSiretNumber(newTutor.getSiretNumber());
        return tutorRepository.save(tutor);
    }

    public void deleteTutor(Long tutorNumber) {
        tutorRepository.deleteById(tutorNumber);
    }
}
