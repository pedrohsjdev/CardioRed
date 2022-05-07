package com.cardiored.cardio.controller;

import com.cardiored.cardio.domain.Paciente;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("pacientes")
public class PacienteController {
//    private final PacienteService pacienteService;

//    public ResponseEntity<Page<Paciente>> page(Pageable pageable){
//        return ResponseEntity.ok(pacienteService.pageAll(pageable));
//    }


}
