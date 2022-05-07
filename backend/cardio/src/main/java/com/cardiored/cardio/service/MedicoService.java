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
public class MedicoService {
    private final MedicoRepository medicoRepository;

    public Page<Medico> pageAll(Pageable pageable) {
        return medicoRepository.findAll(pageable);
    }

    public Medico findByCrm(String crm) {
        return medicoRepository.findByCrm(crm);
    }

    public List<Medico> findByName(String name) {
        return medicoRepository.findByName(name);
    }    

    public Medico findByIdOrThrowException(Integer id) {
        return medicoRepository.findById(id).orElseThrow(() -> new RuntimeException("Medico not found!"));
    }

    @Transactional
    public Medico save(Medico medico) {
        Medico medicoFound = findByCrm(medico.getCrm());
        if(medicoFound == null) {
            return medicoRepository.save(medico);
        }
        throw new RuntimeException("Medico already exists!");
    }

    public void delete(Integer id) {
        medicoRepository.delete(findByIdOrThrowException(id));
    }

    public void replace(Medico medico) {
        findByIdOrThrowException(medico.getId());
        medicoRepository.save(medico);
    } 
}
