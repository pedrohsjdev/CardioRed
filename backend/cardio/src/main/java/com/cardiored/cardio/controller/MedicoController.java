package com.cardiored.cardio.controller;

import java.util.List;

import javax.validation.Valid;

import com.cardiored.cardio.domain.Medico;
import com.cardiored.cardio.mapper.MedicoMapper;
import com.cardiored.cardio.request.medico.MedicoPostDTO;
import com.cardiored.cardio.request.medico.MedicoPutDTO;
import com.cardiored.cardio.request.medico.MedicoResponsePostDTO;
import com.cardiored.cardio.service.MedicoService;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("medicos")
@RequiredArgsConstructor
public class MedicoController {
    private final MedicoService medicoService;
 
    @GetMapping
    public ResponseEntity<Page<Medico>> pageAll(Pageable pageable) {
        return ResponseEntity.ok(medicoService.pageAll(pageable));
    }

    @GetMapping("/find/id/{id}")
    public ResponseEntity<Medico> findById(@PathVariable(required=false) Integer id) {
        return ResponseEntity.ok(medicoService.findByIdOrThrowException(id));        
    }

    @GetMapping("/find/name/{name}")
    public ResponseEntity<List<Medico>> findByName(@PathVariable(required=false) String name) {
        return ResponseEntity.ok(medicoService.findByName(name));        
    }

    @GetMapping("/find/crm/{crm}")
    public ResponseEntity<Medico> findByCrm(@PathVariable(required=false) String crm) {
        return ResponseEntity.ok(medicoService.findByCrm(crm));
    }

    @PostMapping
    public ResponseEntity<MedicoResponsePostDTO> save(@RequestBody @Valid MedicoPostDTO medicoPostDTO) {
        return ResponseEntity.ok(MedicoMapper.INSTANCE.toMedicoResponsePostDTO(medicoService.save(medicoPostDTO)));
    } 

    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody @Valid MedicoPutDTO medicoPutDTO) {
        medicoService.replace(medicoPutDTO);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestParam(required = true) Integer id) {
        medicoService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
