package com.cardiored.cardio.repository;

import com.cardiored.cardio.domain.Paciente;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Integer> {
    List<Paciente> findByName(String name);

    Page<Paciente> findByNameContains(@Param("name") String name, Pageable pageable);

    List<Paciente> findByNameContains(@Param("name") String name);

    Page<Paciente> findByCpfContains(@Param("cpf") String cpf, Pageable pageable);

    Paciente findByCpf(String cpf);
}
