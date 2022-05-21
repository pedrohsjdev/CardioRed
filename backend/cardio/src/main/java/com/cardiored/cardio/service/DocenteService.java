package com.cardiored.cardio.service;

import javax.transaction.Transactional;

import com.cardiored.cardio.domain.Docente;
import com.cardiored.cardio.domain.Medico;
import com.cardiored.cardio.repository.DocenteRepository;
import com.cardiored.cardio.repository.MedicoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class DocenteService extends MedicoService {
    private final DocenteRepository docenteRepository;

    @Autowired
    protected DocenteService(MedicoRepository medicoRepository, DocenteRepository docenteRepository) {
        super(medicoRepository);
        this.docenteRepository = docenteRepository;
    }

    public Docente save(Docente docente) {
        // Search a Medico with the same CRM as the new Docente.
        Medico medicoSameCRM = findByCrm(docente.getCrm());
        // If Medico with the same CRM was found, then...
        if(medicoSameCRM != null) {
            throw new RuntimeException("Docente already exists!");
        }

        return docenteRepository.save(docente);
        
    }

    public void replace(Docente docente) {
        // Docente exists?
        findByIdOrThrowException(docente.getId());

        // Search a Medico with the same CRM as the new Docente.
        Medico medicoSameCRM = findByCrm(docente.getCrm());
        // If Medico with the same CRM was found and he isn't the Docente being updated, then...
        if(medicoSameCRM != null && medicoSameCRM.getId() != docente.getId()) {
            throw new RuntimeException("Already exists a Medico with this CRM!");
        }

        docenteRepository.save(docente);        
    } 
}
