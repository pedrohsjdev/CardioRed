package com.cardiored.cardio.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.cardiored.cardio.domain.Medico;
import com.cardiored.cardio.domain.User;
import com.cardiored.cardio.request.medico.MedicoDTO;
import com.cardiored.cardio.request.medico.MedicoPutDTO;
import com.cardiored.cardio.service.MedicoService;
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
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<Page<Medico>> pageAll(Pageable pageable) {
        return ResponseEntity.ok(medicoService.pageAll(pageable));
    }

    @GetMapping("find/id/{id}")
    public ResponseEntity<Medico> findById(@PathVariable(required = false) Integer id) {
        return ResponseEntity.ok(medicoService.findByIdOrThrowException(id));
    }

    @GetMapping("find/name/{name}")
    public ResponseEntity<List<Medico>> findByName(@PathVariable(required = false) String name) {
        return ResponseEntity.ok(medicoService.findByName(name));
    }

    @GetMapping(path = "find/name/like/{name}")
    public ResponseEntity<Page<Medico>> findByNameLike(@PathVariable String name, Pageable pageable) {
        return ResponseEntity.ok(medicoService.findByNameContains(name, pageable));
    }

    @GetMapping(path = "findList/name/like/{name}")
    public ResponseEntity<List<Medico>> findByNameLikeList(@PathVariable String name) {
        return ResponseEntity.ok(medicoService.findByNameContains(name));
    }

    @GetMapping("find/crm/{crm}")
    public ResponseEntity<Medico> findByCrm(@PathVariable(required = false) String crm) {
        return ResponseEntity.ok(medicoService.findByCrm(crm));
    }

    @GetMapping(path = "find/crm/like/{crm}")
    public ResponseEntity<Page<Medico>> findByCrmLike(@PathVariable String crm, Pageable pageable) {
        return ResponseEntity.ok(medicoService.findByCrmContains(crm, pageable));
    }

    @PostMapping
    public ResponseEntity<Void> save(@RequestBody @Valid MedicoDTO medicoDTO) {

        User user = null;
        switch (medicoDTO.getDoctorType()) {
            case DOCENTE:
                user = userService
                        .save(new User(null, medicoDTO.getCrm(), medicoDTO.getPassword(), new ArrayList<>()));
                userService.addRoleToUser(medicoDTO.getCrm(), "ROLE_DOCENTE");
                medicoService.save(Medico.builder()
                        .crm(medicoDTO.getCrm())
                        .name(medicoDTO.getName())
                        .doctorType(medicoDTO.getDoctorType())
                        .user(user)
                        .titulation(medicoDTO.getTitulation())
                        .build());
                break;
            case RESIDENTE:
                user = userService
                        .save(new User(null, medicoDTO.getCrm(), medicoDTO.getPassword(), new ArrayList<>()));
                userService.addRoleToUser(medicoDTO.getCrm(), "ROLE_RESIDENTE");
                medicoService.save(Medico.builder()
                        .crm(medicoDTO.getCrm())
                        .name(medicoDTO.getName())
                        .doctorType(medicoDTO.getDoctorType())
                        .user(user)
                        .residencyYear(medicoDTO.getResidencyYear())
                        .build());
                break;
            case MEDICO:
                user = userService
                        .save(new User(null, medicoDTO.getCrm(), medicoDTO.getPassword(), new ArrayList<>()));
                userService.addRoleToUser(medicoDTO.getCrm(), "ROLE_MEDICO");
                medicoService.save(Medico.builder()
                        .crm(medicoDTO.getCrm())
                        .name(medicoDTO.getName())
                        .doctorType(medicoDTO.getDoctorType())
                        .user(user)
                        .build());
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Void> replace(@RequestBody @Valid MedicoPutDTO medicoPutDTO) {
        medicoService.medicoSameCRM(medicoPutDTO.getCrm(), medicoPutDTO.getId());
        User user = medicoPutDTO.getUser();
        user.setUsername(medicoPutDTO.getCrm());
        if (!user.getPassword().equals("")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        } else {
            user.setPassword(userService.findByIdOrThrowException(user.getId()).getPassword());
        }
        user.getRoles().clear();
        userService.replace(user);
        switch (medicoPutDTO.getDoctorType()) {
            case DOCENTE:
                userService.addRoleToUser(user.getUsername(), "ROLE_DOCENTE");
                medicoService.replace(Medico.builder().id(medicoPutDTO.getId())
                        .crm(medicoPutDTO.getCrm())
                        .name(medicoPutDTO.getName())
                        .doctorType(medicoPutDTO.getDoctorType())
                        .user(user)
                        .titulation(medicoPutDTO.getTitulation())
                        .build());
                break;
            case RESIDENTE:
                userService.addRoleToUser(user.getUsername(), "ROLE_RESIDENTE");
                medicoService.replace(Medico.builder().id(medicoPutDTO.getId())
                        .crm(medicoPutDTO.getCrm())
                        .name(medicoPutDTO.getName())
                        .doctorType(medicoPutDTO.getDoctorType())
                        .user(user)
                        .residencyYear(medicoPutDTO.getResidencyYear())
                        .build());
                break;
            case MEDICO:
                userService.addRoleToUser(user.getUsername(), "ROLE_MEDICO");
                medicoService.replace(Medico.builder().id(medicoPutDTO.getId())
                        .crm(medicoPutDTO.getCrm())
                        .name(medicoPutDTO.getName())
                        .doctorType(medicoPutDTO.getDoctorType())
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
