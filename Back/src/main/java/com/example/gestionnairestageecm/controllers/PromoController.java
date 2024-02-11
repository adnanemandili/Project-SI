package com.example.gestionnairestageecm.controllers;

import java.util.List;

import com.example.gestionnairestageecm.models.PromoRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.gestionnairestageecm.models.Promo;
import com.example.gestionnairestageecm.services.PromoService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/promos")
public class PromoController {
    
    @Autowired
    private final PromoService promoService;
    
    @GetMapping("/list")
    public List<Promo> getAllPromos() {
        return promoService.getAllPromos();
    }

    @GetMapping("/id={promoId}")
    public Promo getPromoById(@PathVariable Long promoId) {
        return promoService.getPromoById(promoId);
    }

    @GetMapping("/year={year}")
    public Promo getPromoByYear(@PathVariable int year) {
        return promoService.getPromoByYear(year);
    }

    @PostMapping("/new")
    public Promo savePromo(@RequestBody PromoRequest promoRequest) {
        Promo promo = new Promo(
                promoRequest.getYear(),
                promoRequest.getProfessorId(),
                promoRequest.getRegistredNumber(),
                promoRequest.getReceiptsNumber()
        );
        return promoService.savePromo(promo);
    }

    @PutMapping("/update/id={promoId}")
    public Promo updatePromo(@PathVariable Long promoId,@RequestBody PromoRequest newPromo) {
        return promoService.updatePromo(promoId, newPromo);
    }

    @DeleteMapping("/delete/id={promoId}")
    public void deletePromo(@PathVariable Long promoId) {
        promoService.deletePromo(promoId);
    }
}
