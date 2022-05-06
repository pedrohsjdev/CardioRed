package com.cardiored.cardio.repository;

import com.cardiored.cardio.domain.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Integer> {
    List<Paciente> findByName(String name);

    Paciente findByCpf(String cpf);
}
