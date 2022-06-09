package com.cardiored.cardio.repository;

import org.springframework.stereotype.Repository;

import com.cardiored.cardio.domain.Consulta;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Integer> {
    
    List<Consulta> findAllByPacienteName(String name);

    List<Consulta> findAllByPacienteCpf(String cpf);

}
