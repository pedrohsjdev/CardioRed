package com.cardiored.cardio.repository;

import com.cardiored.cardio.domain.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PacienteRepository extends JpaRepository<Paciente, Integer> {
    List<Paciente> findByName(String name);

    Paciente findByCpf(String cpf);
}
