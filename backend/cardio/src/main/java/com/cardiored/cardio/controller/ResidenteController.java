package com.cardiored.cardio.controller;


import javax.validation.Valid;

import com.cardiored.cardio.mapper.ResidenteMapper;
import com.cardiored.cardio.request.ResidentePostDTO;
import com.cardiored.cardio.request.ResidentePutDTO;
import com.cardiored.cardio.request.ResidenteResponsePostDTO;
import com.cardiored.cardio.service.ResidenteService;

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
@RequestMapping("residentes")
@RequiredArgsConstructor
public class ResidenteController {
    private final ResidenteService residenteService;
 
    @PostMapping
    public ResponseEntity<ResidenteResponsePostDTO> save(@RequestBody @Valid ResidentePostDTO residentePostDTO) {
        return ResponseEntity.ok(ResidenteMapper.INSTANCE.toResidenteResponsePostDTO(residenteService.save(residentePostDTO)));
    }

    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody @Valid ResidentePutDTO residentePutDTO) {
        residenteService.replace(residentePutDTO);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestParam(required = true) Integer id) {
        residenteService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
