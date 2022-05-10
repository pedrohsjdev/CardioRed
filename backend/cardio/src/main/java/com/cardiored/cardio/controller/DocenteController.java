package com.cardiored.cardio.controller;

import javax.validation.Valid;

import com.cardiored.cardio.mapper.DocenteMapper;
import com.cardiored.cardio.request.DocentePostDTO;
import com.cardiored.cardio.request.DocentePutDTO;
import com.cardiored.cardio.request.DocenteResponsePostDTO;
import com.cardiored.cardio.service.DocenteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("docentes")
@RequiredArgsConstructor
public class DocenteController {
    private final DocenteService docenteService;
 
    @PostMapping
    public ResponseEntity<DocenteResponsePostDTO> save(@RequestBody @Valid DocentePostDTO docentePostDTO) {
        return ResponseEntity.ok(DocenteMapper.INSTANCE.toDocenteResponsePostDTO(docenteService.save(docentePostDTO)));
    }

    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody @Valid DocentePutDTO docentePutDTO) {
        docenteService.replace(docentePutDTO);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestParam(required = true) Integer id) {
        docenteService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
