package com.cardiored.cardio.service;

import java.util.List;

import javax.transaction.Transactional;

import com.cardiored.cardio.domain.Medico;
import com.cardiored.cardio.repository.MedicoRepository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MedicoService {
    private final MedicoRepository medicoRepository;

    public Page<Medico> pageAll(Pageable pageable) {
        return medicoRepository.findAll(pageable);
    }

    public Medico findByCrm(String crm) {
        return medicoRepository.findByCrm(crm);
    }

    public Page<Medico> findByCrmContains(String crm, Pageable pageable) {
        return medicoRepository.findByCrmContains(crm, pageable);
    }

    public List<Medico> findByName(String name) {
        return medicoRepository.findByName(name);
    }

    public Page<Medico> findByNameContains(String name, Pageable pageable) {
        return medicoRepository.findByNameContains(name, pageable);
    }

    public List<Medico> findByNameContains(String name) {
        return medicoRepository.findByNameContains(name);
    }

    public Medico findByIdOrThrowException(Integer id) {
        return medicoRepository.findById(id).orElseThrow(() -> new RuntimeException("Medico not found!"));
    }

    public Medico save(Medico medico) {
        // Search a Medico with the same CRM as the new Docente.
        Medico medicoFound = findByCrm(medico.getCrm());
        // If Medico with the same CRM was found, then...
        if (medicoFound != null) {
            throw new RuntimeException("Medico already exists!");
        }

        return medicoRepository.save(medico);
    }

    public void delete(Integer id) {
        medicoRepository.delete(findByIdOrThrowException(id));
    }

    public void replace(Medico medico) {
        findByIdOrThrowException(medico.getId());

        medicoSameCRM(medico.getCrm(), medico.getId());

        medicoRepository.save(medico);
    }

    public void medicoSameCRM(String crm, Integer id) {
        // Search a Medico with the same CRM as the new Medico.
        Medico medicoSameCRM = findByCrm(crm);
        // If Medico with the same CRM was found and he isn't the Medico being updated,
        // then...
        if (medicoSameCRM != null && medicoSameCRM.getId() != id) {
            throw new RuntimeException("Already exists a Medico with this CRM!");
        }
    }
}
