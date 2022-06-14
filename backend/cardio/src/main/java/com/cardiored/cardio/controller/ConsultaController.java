package com.cardiored.cardio.controller;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cardiored.cardio.domain.Consulta;
import com.cardiored.cardio.mapper.ConsultaMapper;
import com.cardiored.cardio.request.consulta.ConsultaPostDTO;
import com.cardiored.cardio.request.consulta.ConsultaPutDTO;
import com.cardiored.cardio.service.ConsultaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("consultas")
public class ConsultaController {
    private final ConsultaService consultaService;

    @GetMapping
    public ResponseEntity<Page<Consulta>> page(Pageable pageable) {
        return ResponseEntity.ok(consultaService.pageAll(pageable));
    }

    @GetMapping(path = "find/id/{id}")
    public ResponseEntity<Consulta> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(consultaService.findByIdOrThrowException(id));
    }

    @GetMapping(path = "/find/name/{name}")
    public ResponseEntity<Page<Consulta>> findByName(@PathVariable String name, Pageable pageable) {
        return ResponseEntity.ok(consultaService.findAllByPacienteName(name, pageable));
    }

    @GetMapping(path = "/find/cpf/{cpf}")
    public ResponseEntity<Page<Consulta>> findByCpf(@PathVariable String cpf, Pageable pageable) {
        return ResponseEntity.ok(consultaService.findAllByPacienteCpf(cpf, pageable));
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody @Valid ConsultaPostDTO consultaPostDTO) {
        consultaService.save(ConsultaMapper.INSTANCE.toConsulta(consultaPostDTO));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        consultaService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody ConsultaPutDTO consultaPutDTO) {
        consultaService.replace(ConsultaMapper.INSTANCE.toConsulta(consultaPutDTO));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
