package com.cardiored.cardio.service;

import com.cardiored.cardio.domain.Paciente;
import com.cardiored.cardio.repository.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

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
    public Paciente save(Paciente paciente){
        return pacienteRepository.save(paciente);
    }

    public void delete(Integer id){
        pacienteRepository.delete(findById(id));
    }

    public void replace(Paciente paciente){
        Paciente savedPaciente = findById(paciente.getId());
        Paciente paciente1 = savedPaciente;
        paciente1.setId(paciente.getId());
        pacienteRepository.save(paciente1);
    }




}
