package com.cardiored.cardio.repository;

import org.springframework.stereotype.Repository;

import com.cardiored.cardio.domain.Consulta;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Integer> {

    Page<Consulta> findAllByPacienteName(String name, Pageable pageable);

    Page<Consulta> findAllByPacienteCpf(String cpf, Pageable pageable);

    boolean existsByPacienteCpfAndExamTypeAndStatus(String cpf, String ExamType, String status);
    
    boolean existsByPacienteCpfAndExamTypeAndStatusAndIdNot(String cpf, String ExamType, String status, Integer id);

}
