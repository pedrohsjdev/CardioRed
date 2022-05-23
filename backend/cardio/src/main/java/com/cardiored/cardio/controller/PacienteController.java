package com.cardiored.cardio.controller;

import com.cardiored.cardio.domain.Paciente;
import com.cardiored.cardio.request.paciente.PacientePostDTO;
import com.cardiored.cardio.request.paciente.PacientePutDTO;
import com.cardiored.cardio.service.PacienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("pacientes")
public class PacienteController {
    private final PacienteService pacienteService;

    @GetMapping
    public ResponseEntity<Page<Paciente>> page(Pageable pageable){
        return ResponseEntity.ok(pacienteService.pageAll(pageable));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Paciente> findById(@PathVariable Integer id){
        return ResponseEntity.ok(pacienteService.findById(id));
    }

    @GetMapping(path = "/find/{name}")
    public ResponseEntity<List<Paciente>> findByName(@PathVariable String name){
        return ResponseEntity.ok(pacienteService.findByName(name));
    }

    @GetMapping(path = "/cpf/{cpf}")
    public ResponseEntity<Paciente> findByCpf(@PathVariable String cpf){
        return ResponseEntity.ok(pacienteService.findByCpf(cpf));
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody @Valid PacientePostDTO pacientePostDTO){
        pacienteService.save(pacientePostDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id){
        pacienteService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody PacientePutDTO pacientePutDTO){
        pacienteService.replace(pacientePutDTO);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
