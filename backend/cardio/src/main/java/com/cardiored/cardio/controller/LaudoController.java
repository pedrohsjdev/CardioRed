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

    @GetMapping(path = "/{status}/{crm}")
    public ResponseEntity<Page<Laudo>> pageAllByStatusOrMedicoCrm(@PathVariable LaudoStatus status,
            @PathVariable String crm, Pageable pageable) {
        return ResponseEntity.ok(laudoService.pageAllByStatusOrMedicoCrm(status, crm, pageable));
    }

    @GetMapping(path = "/statusnot/{status}")
    public ResponseEntity<Page<Laudo>> pageStatusNot(@PathVariable LaudoStatus status, Pageable pageable) {
        return ResponseEntity.ok(laudoService.pageAllStatusNot(status, pageable));
    }

    @GetMapping(path = "find/id/{id}")
    public ResponseEntity<Laudo> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(laudoService.findByIdOrThrowException(id));
    }

    // Geral
    @GetMapping(path = "find/name/like/{name}")
    public ResponseEntity<Page<Laudo>> findAllByPacienteName(@PathVariable String name,
            Pageable pageable) {
        return ResponseEntity.ok(laudoService.findAllByPacienteName(name, pageable));
    }

    // Medico
    @GetMapping(path = "find/{status}/name/like/{name}")
    public ResponseEntity<Page<Laudo>> findAllByPacienteNameAndStatus(@PathVariable String name,
            @PathVariable LaudoStatus status, Pageable pageable) {
        return ResponseEntity.ok(laudoService.findAllByPacienteNameAndStatus(name, status, pageable));
    }

    // Residente
    @GetMapping(path = "find/name/like/{name}/{status}/{crm}")
    public ResponseEntity<Page<Laudo>> findAllByPacienteNameAndStatusOrMedicoCrm(@PathVariable String name,
            @PathVariable LaudoStatus status,
            @PathVariable String crm, Pageable pageable) {
        return ResponseEntity
                .ok(laudoService.findAllByPacienteNameAndStatusOrMedicoCrm(name, status, crm, pageable));
    }

    // Geral
    @GetMapping(path = "find/cpf/like/{cpf}")
    public ResponseEntity<Page<Laudo>> findAllByPacienteCpf(@PathVariable String cpf, Pageable pageable) {
        return ResponseEntity.ok(laudoService.findAllByPacienteCpf(cpf, pageable));
    }

    // Medico
    @GetMapping(path = "find/{status}/cpf/like/{cpf}")
    public ResponseEntity<Page<Laudo>> findAllByPacienteCpfAndStatus(@PathVariable String cpf,
            @PathVariable LaudoStatus status, Pageable pageable) {
        return ResponseEntity.ok(laudoService.findAllByPacienteCpfAndStatus(cpf, status, pageable));
    }

    // Residente
    @GetMapping(path = "find/cpf/like/{cpf}/{status}/{crm}")
    public ResponseEntity<Page<Laudo>> findAllByPacienteCpfAndStatusOrMedicoCrm(@PathVariable String cpf,
            @PathVariable LaudoStatus status,
            @PathVariable String crm, Pageable pageable) {
        return ResponseEntity
                .ok(laudoService.findAllByPacienteCpfAndStatusOrMedicoCrm(cpf, status, crm, pageable));
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
