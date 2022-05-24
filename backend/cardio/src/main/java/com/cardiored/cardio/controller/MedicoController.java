package com.cardiored.cardio.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.cardiored.cardio.domain.Docente;
import com.cardiored.cardio.domain.Medico;
import com.cardiored.cardio.domain.Residente;
import com.cardiored.cardio.domain.User;
import com.cardiored.cardio.request.medico.AllMedicoInfo;
import com.cardiored.cardio.service.DocenteService;
import com.cardiored.cardio.service.MedicoService;
import com.cardiored.cardio.service.ResidenteService;
import com.cardiored.cardio.service.UserService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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
    private final UserService userService;
    private final DocenteService docenteService;
    private final ResidenteService residenteService;
    private final PasswordEncoder passwordEncoder;
 
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
    public ResponseEntity<Void> save(@RequestBody @Valid AllMedicoInfo allMedicoInfo) {
        User user;
        switch(allMedicoInfo.getDoctorType()) {            
            case DOCENTE:                
                user = userService.save(new User(null, allMedicoInfo.getCrm(), allMedicoInfo.getPassword(), new ArrayList<>()));
                userService.addRoleToUser(allMedicoInfo.getCrm(), "ROLE_DOCENTE");
                userService.addRoleToUser(allMedicoInfo.getCrm(), "ROLE_MEDICO");

                docenteService.save(Docente.builder()
                                                .crm(allMedicoInfo.getCrm())
                                                .name(allMedicoInfo.getName())
                                                .doctorType(allMedicoInfo.getDoctorType())
                                                .user(user)
                                                .titulation(allMedicoInfo.getTitulation())
                                                .build());
                break;
            case RESIDENTE:
                user = userService.save(new User(null, allMedicoInfo.getCrm(), allMedicoInfo.getPassword(), new ArrayList<>()));
                userService.addRoleToUser(allMedicoInfo.getCrm(), "ROLE_RESIDENTE");
                userService.addRoleToUser(allMedicoInfo.getCrm(), "ROLE_MEDICO");

                residenteService.save(Residente.builder()
                                                .crm(allMedicoInfo.getCrm())
                                                .name(allMedicoInfo.getName())
                                                .doctorType(allMedicoInfo.getDoctorType())
                                                .user(user)
                                                .residencyYear(allMedicoInfo.getResidencyYear())
                                                .build());
                break;
            case MEDICO:
                user = userService.save(new User(null, allMedicoInfo.getCrm(), allMedicoInfo.getPassword(), new ArrayList<>()));
                userService.addRoleToUser(allMedicoInfo.getCrm(), "ROLE_MEDICO");

                medicoService.save(Medico.builder()
                                                .crm(allMedicoInfo.getCrm())
                                                .name(allMedicoInfo.getName())
                                                .doctorType(allMedicoInfo.getDoctorType())
                                                .user(user)                                                
                                                .build());
        }


        return new ResponseEntity<>(HttpStatus.CREATED);
    } 

    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody @Valid AllMedicoInfo allMedicoInfo) {
        User user;
        switch(allMedicoInfo.getDoctorType()) {            
            case DOCENTE:          
                user = docenteService.findByIdOrThrowException(allMedicoInfo.getId()).getUser();
                user.setUsername(allMedicoInfo.getCrm());
                if(allMedicoInfo.getPassword() != null) {    
                    user.setPassword(passwordEncoder.encode(allMedicoInfo.getPassword()));
                }               
                user.setRoles(new ArrayList<>());
                userService.replace(user);
                userService.addRoleToUser(allMedicoInfo.getCrm(), "ROLE_DOCENTE");
                userService.addRoleToUser(allMedicoInfo.getCrm(), "ROLE_MEDICO");
               
                docenteService.replace(Docente.builder()
                                                .id(allMedicoInfo.getId())
                                                .crm(allMedicoInfo.getCrm())
                                                .name(allMedicoInfo.getName())
                                                .doctorType(allMedicoInfo.getDoctorType())
                                                .user(user)
                                                .titulation(allMedicoInfo.getTitulation())
                                                .build());
                break;
            case RESIDENTE:
                user = residenteService.findByIdOrThrowException(allMedicoInfo.getId()).getUser();
                user.setUsername(allMedicoInfo.getCrm());
                if(allMedicoInfo.getPassword() != null) {    
                    user.setPassword(passwordEncoder.encode(allMedicoInfo.getPassword()));
                }               
                user.setRoles(new ArrayList<>());
                userService.addRoleToUser(allMedicoInfo.getCrm(), "ROLE_RESIDENTE");
                userService.addRoleToUser(allMedicoInfo.getCrm(), "ROLE_MEDICO");

                residenteService.replace(Residente.builder()
                                                .id(allMedicoInfo.getId())
                                                .crm(allMedicoInfo.getCrm())
                                                .name(allMedicoInfo.getName())
                                                .doctorType(allMedicoInfo.getDoctorType())
                                                .user(user)
                                                .residencyYear(allMedicoInfo.getResidencyYear())
                                                .build());
                break;
            case MEDICO:
                user = residenteService.findByIdOrThrowException(allMedicoInfo.getId()).getUser();
                user.setUsername(allMedicoInfo.getCrm());
                if(allMedicoInfo.getPassword() != null) {    
                    user.setPassword(passwordEncoder.encode(allMedicoInfo.getPassword()));
                }               
                user.setRoles(new ArrayList<>());
                userService.addRoleToUser(allMedicoInfo.getCrm(), "ROLE_MEDICO");

                medicoService.replace(Medico.builder()
                                                .id(allMedicoInfo.getId())
                                                .crm(allMedicoInfo.getCrm())
                                                .name(allMedicoInfo.getName())
                                                .doctorType(allMedicoInfo.getDoctorType())
                                                .user(user)                                                
                                                .build());
        }


        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestParam(required = true) Integer id) {        
        Integer userId = medicoService.findByIdOrThrowException(id).getUser().getId();
        medicoService.delete(id);
        userService.delete(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
