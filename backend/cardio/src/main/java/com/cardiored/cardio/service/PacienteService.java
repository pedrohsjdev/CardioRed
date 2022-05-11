package com.cardiored.cardio.service;

import com.cardiored.cardio.domain.Paciente;
import com.cardiored.cardio.mapper.PacienteMapper;
import com.cardiored.cardio.repository.PacienteRepository;
import com.cardiored.cardio.request.paciente.PacientePostDTO;
import com.cardiored.cardio.request.paciente.PacientePutDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public Page<Paciente> pageAll(Pageable pageable){
        return pacienteRepository.findAll(pageable);
    }

    public Paciente findById(Integer id){
        return pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente not found"));
    }

    public List<Paciente> findByName(String name){
        return pacienteRepository.findByName(name);
    }

    public Paciente findByCpf(String cpf){
        return pacienteRepository.findByCpf(cpf);
    }

    @Transactional
    public Paciente save(PacientePostDTO pacientePostDTO){
        Assert.isNull(findByCpf(pacientePostDTO.getCpf()), "cpf already exists");
        Paciente paciente = PacienteMapper.INSTANCE.toPaciente(pacientePostDTO);
        return pacienteRepository.save(paciente);
    }

    public void delete(Integer id){
        pacienteRepository.delete(findById(id));
    }

    public void replace(PacientePutDTO pacientePutDTO){
        Paciente savedPaciente = findById(pacientePutDTO.getId());
        Paciente paciente = PacienteMapper.INSTANCE.toPaciente(pacientePutDTO);
        paciente.setId(savedPaciente.getId());
        pacienteRepository.save(paciente);
    }




}
