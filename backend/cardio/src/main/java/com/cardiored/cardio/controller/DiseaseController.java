package com.cardiored.cardio.controller;

import com.cardiored.cardio.domain.Disease;
import com.cardiored.cardio.service.DiseaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("diseases")
public class DiseaseController {
    private final DiseaseService diseaseService;

    @GetMapping(path = "/find/code/like/{code}")
    public ResponseEntity<List<Disease>> findAllByCodeContains(@PathVariable String code) {
        return ResponseEntity.ok(diseaseService.findAllByCodeContains(code));
    }

    @GetMapping(path = "/find/name/like/{name}")
    public ResponseEntity<List<Disease>> findAllByNameContains(@PathVariable String name) {
        return ResponseEntity.ok(diseaseService.findAllByNameContains(name));
    }

}
