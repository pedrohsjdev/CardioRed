package com.cardiored.cardio.repository;

import com.cardiored.cardio.domain.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Integer> {
    List<Paciente> findByName(String name);

    List<Paciente> findByNameContains(@Param("name") String name);

    List<Paciente> findByCpfContains(@Param("cpf") String cpf);

    Paciente findByCpf(String cpf);
}
