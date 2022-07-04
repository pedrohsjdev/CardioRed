package com.cardiored.cardio.service;

import com.cardiored.cardio.domain.Paciente;
import com.cardiored.cardio.repository.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public Page<Paciente> pageAll(Pageable pageable) {
        return pacienteRepository.findAll(pageable);
    }

    public Paciente findById(Integer id) {
        return pacienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente not found"));
    }

    public List<Paciente> findByName(String name) {
        return pacienteRepository.findByName(name);
    }

    public Page<Paciente> findByNameContains(String name, Pageable pageable) {
        return pacienteRepository.findByNameContains(name, pageable);
    }

    public Page<Paciente> findByCpfContains(String cpf, Pageable pageable) {
        return pacienteRepository.findByCpfContains(cpf, pageable);
    }

    public Paciente findByCpf(String cpf) {
        return pacienteRepository.findByCpf(cpf);
    }

    public Paciente save(Paciente paciente) {
        Assert.isNull(findByCpf(paciente.getCpf()), "cpf already exists");
        return pacienteRepository.save(paciente);
    }

    public void delete(Integer id) {
        pacienteRepository.delete(findById(id));
    }

    public void replace(Paciente paciente) {
        Paciente pacienteReplacing = findById(paciente.getId());
        Paciente pacienteSameCPF = findByCpf(paciente.getCpf());
        if (pacienteSameCPF != null && pacienteSameCPF.getId() != pacienteReplacing.getId()) {
            throw new RuntimeException("Already exists a Paciente with this CPF!");
        }
        pacienteRepository.save(paciente);
    }

}
