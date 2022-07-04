package com.cardiored.cardio.controller;

import com.cardiored.cardio.domain.Laudo;
import com.cardiored.cardio.domain.LaudoStatus;
import com.cardiored.cardio.mapper.LaudoMapper;
import com.cardiored.cardio.request.laudo.LaudoPostDTO;
import com.cardiored.cardio.service.LaudoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("laudos")
public class LaudoController {

    private final LaudoService laudoService;

    @GetMapping
    public ResponseEntity<Page<Laudo>> page(Pageable pageable) {
        return ResponseEntity.ok(laudoService.pageAll(pageable));
    }

    @GetMapping(path = "/statusnot/{status}")
    public ResponseEntity<Page<Laudo>> pageStatusNot(@PathVariable LaudoStatus status, Pageable pageable) {
        return ResponseEntity.ok(laudoService.pageAllStatusNot(status, pageable));
    }

    @GetMapping(path = "find/id/{id}")
    public ResponseEntity<Laudo> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(laudoService.findByIdOrThrowException(id));
    }

    @GetMapping(path = "find/name/like/{name}")
    public ResponseEntity<Page<Laudo>> findByPacienteNameContains(@PathVariable String name, Pageable pageable) {
        return ResponseEntity.ok(laudoService.findAllByPacienteNameContains(name, pageable));
    }

    @GetMapping(path = "find/cpf/like/{cpf}")
    public ResponseEntity<Page<Laudo>> findByPacienteCpfContains(@PathVariable String cpf, Pageable pageable) {
        return ResponseEntity.ok(laudoService.findAllByPacienteCpfContains(cpf, pageable));
    }

    @GetMapping(path = "getLastId")
    public ResponseEntity<Integer> getLastId() {
        return ResponseEntity.ok(laudoService.getLastId());
    }

    @PostMapping(path = "consultaExists")
    public ResponseEntity<Boolean> consultaExists(@RequestBody LaudoPostDTO laudoPostDTO) {
        return ResponseEntity.ok(laudoService
                .existConsultaWithPacienteAndExamType(LaudoMapper.INSTANCE.toLaudo(laudoPostDTO)));

    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody @Valid LaudoPostDTO laudoPostDTO) {
        System.out.println("DTO: " + laudoPostDTO);
        laudoService.save(LaudoMapper.INSTANCE.toLaudo(laudoPostDTO));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        laudoService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody Laudo laudo) {
        laudoService.replace(laudo);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
