package com.cardiored.cardio.service;

import javax.transaction.Transactional;

import com.cardiored.cardio.domain.Docente;
import com.cardiored.cardio.domain.Medico;
import com.cardiored.cardio.mapper.DocenteMapper;
import com.cardiored.cardio.repository.DocenteRepository;
import com.cardiored.cardio.repository.MedicoRepository;
import com.cardiored.cardio.request.docente.DocentePostDTO;
import com.cardiored.cardio.request.docente.DocentePutDTO;

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

    public Docente save(DocentePostDTO docentePostDTO) {
        // Search a Medico with the same CRM as the new Docente.
        Medico medicoSameCRM = findByCrm(docentePostDTO.getCrm());
        // If Medico with the same CRM was found, then...
        if(medicoSameCRM != null) {
            throw new RuntimeException("Docente already exists!");
        }

        return docenteRepository.save(DocenteMapper.INSTANCE.toDocente(docentePostDTO));
        
    }

    public void replace(DocentePutDTO docentePutDTO) {
        // Docente exists?
        findByIdOrThrowException(docentePutDTO.getId());

        // Search a Medico with the same CRM as the new Docente.
        Medico medicoSameCRM = findByCrm(docentePutDTO.getCrm());
        // If Medico with the same CRM was found and he isn't the Docente being updated, then...
        if(medicoSameCRM != null && medicoSameCRM.getId() != docentePutDTO.getId()) {
            throw new RuntimeException("Already exists a Medico with this CRM!");
        }

        docenteRepository.save(DocenteMapper.INSTANCE.toDocente(docentePutDTO));        
    } 
}
