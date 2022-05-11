package com.cardiored.cardio.service;

import java.util.List;

import javax.transaction.Transactional;

import com.cardiored.cardio.domain.Medico;
import com.cardiored.cardio.mapper.MedicoMapper;
import com.cardiored.cardio.repository.MedicoRepository;
import com.cardiored.cardio.request.medico.MedicoPostDTO;
import com.cardiored.cardio.request.medico.MedicoPutDTO;

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
    public Medico save(MedicoPostDTO medicoPostDTO) {
        // Search a Medico with the same CRM as the new Docente.
        Medico medicoFound = findByCrm(medicoPostDTO.getCrm());
        // If Medico with the same CRM was found, then...
        if(medicoFound != null) {
            throw new RuntimeException("Medico already exists!");            
        }

        return medicoRepository.save(MedicoMapper.INSTANCE.toMedico(medicoPostDTO));
    }

    public void delete(Integer id) {
        medicoRepository.delete(findByIdOrThrowException(id));
    }

    @Transactional
    public void replace(MedicoPutDTO medicoPutDTO) {
        findByIdOrThrowException(medicoPutDTO.getId());

        // Search a Medico with the same CRM as the new Medico.
        Medico medicoSameCRM = findByCrm(medicoPutDTO.getCrm());
        // If Medico with the same CRM was found and he isn't the Medico being updated, then...
        if(medicoSameCRM != null && medicoSameCRM.getId() != medicoPutDTO.getId()) {
            throw new RuntimeException("Already exists a Medico with this CRM!");
        }

        medicoRepository.save(MedicoMapper.INSTANCE.toMedico(medicoPutDTO));
    } 
}
