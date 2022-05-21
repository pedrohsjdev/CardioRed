package com.cardiored.cardio.service;

import javax.transaction.Transactional;

import com.cardiored.cardio.domain.Medico;
import com.cardiored.cardio.domain.Residente;
import com.cardiored.cardio.repository.MedicoRepository;
import com.cardiored.cardio.repository.ResidenteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ResidenteService extends MedicoService{
    private final ResidenteRepository residenteRepository;

    @Autowired
    protected ResidenteService(MedicoRepository medicoRepository, ResidenteRepository residenteRepository) {
        super(medicoRepository);
        this.residenteRepository = residenteRepository;
    }

    public Residente save(Residente residente) {
        // Search a Medico with the same CRM as the new Residente.
        Medico medicoSameCRM = findByCrm(residente.getCrm());
        // If Medico with the same CRM was found, then...
        if(medicoSameCRM != null) {
            throw new RuntimeException("Residente already exists!");            
        }
        return residenteRepository.save(residente);        
    }

    public void replace(Residente residente) {
        findByIdOrThrowException(residente.getId());

        // Search a Medico with the same CRM as the new Residente.
        Medico medicoSameCRM = findByCrm(residente.getCrm());
        // If Medico with the same CRM was found and he isn't the Residente being updated, then...
        if(medicoSameCRM != null && medicoSameCRM.getId() != residente.getId()) {
            throw new RuntimeException("Already exists a Medico with this CRM!");
        }

        residenteRepository.save(residente);
    }
}
