package com.cardiored.cardio.controller;

import com.cardiored.cardio.domain.Laudo;
import com.cardiored.cardio.request.laudo.LaudoPostDTO;
import com.cardiored.cardio.service.LaudoService;
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
@RequestMapping("laudos")
public class LaudoController {

    private final LaudoService laudoService;

    @GetMapping
    public ResponseEntity<Page<Laudo>> page(Pageable pageable){
        return ResponseEntity.ok(laudoService.pageAll(pageable));
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Laudo> findById(@PathVariable Integer id){
        return ResponseEntity.ok(laudoService.findById(id));
    }

    @GetMapping(path = "/find/{name}")
    public ResponseEntity<List<Laudo>> findByPacienteName(@PathVariable String name){
        return ResponseEntity.ok(laudoService.findByPacienteName(name));
    }

    @GetMapping(path = "/cpf/{cpf}")
    public ResponseEntity<List<Laudo>> findByPacienteCpf(@PathVariable String cpf){
        return ResponseEntity.ok(laudoService.findByPacienteCpf(cpf));
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody @Valid LaudoPostDTO laudoPostDTO){
        laudoService.save(laudoPostDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id){
        laudoService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody Laudo laudo){
        laudoService.replace(laudo);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
