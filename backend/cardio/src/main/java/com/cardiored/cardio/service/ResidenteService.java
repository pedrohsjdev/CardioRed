package com.cardiored.cardio.service;

import javax.transaction.Transactional;

import com.cardiored.cardio.domain.Medico;
import com.cardiored.cardio.domain.Residente;
import com.cardiored.cardio.mapper.ResidenteMapper;
import com.cardiored.cardio.repository.MedicoRepository;
import com.cardiored.cardio.repository.ResidenteRepository;
import com.cardiored.cardio.request.residente.ResidentePostDTO;
import com.cardiored.cardio.request.residente.ResidentePutDTO;

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

    public Residente save(ResidentePostDTO residentePostDTO) {
        // Search a Medico with the same CRM as the new Residente.
        Medico medicoSameCRM = findByCrm(residentePostDTO.getCrm());
        // If Medico with the same CRM was found, then...
        if(medicoSameCRM != null) {
            throw new RuntimeException("Residente already exists!");            
        }

        return residenteRepository.save(ResidenteMapper.INSTANCE.toResidente(residentePostDTO));        
    }

    public void replace(ResidentePutDTO residentePutDTO) {
        findByIdOrThrowException(residentePutDTO.getId());

        // Search a Medico with the same CRM as the new Residente.
        Medico medicoSameCRM = findByCrm(residentePutDTO.getCrm());
        // If Medico with the same CRM was found and he isn't the Residente being updated, then...
        if(medicoSameCRM != null && medicoSameCRM.getId() != residentePutDTO.getId()) {
            throw new RuntimeException("Already exists a Medico with this CRM!");
        }

        residenteRepository.save(ResidenteMapper.INSTANCE.toResidente(residentePutDTO));
    }
}
