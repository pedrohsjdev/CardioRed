package com.cardiored.cardio.repository;

import org.springframework.stereotype.Repository;

import com.cardiored.cardio.domain.Consulta;
import com.cardiored.cardio.domain.ConsultaStatus;
import com.cardiored.cardio.domain.ExamType;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ConsultaRepository extends JpaRepository<Consulta, Integer> {

    Page<Consulta> findAllByPacienteName(String name, Pageable pageable);

    Page<Consulta> findAllByPacienteCpf(String cpf, Pageable pageable);

    boolean existsByPacienteCpfAndExamTypeAndStatus(String cpf, ExamType examType, ConsultaStatus status);

    boolean existsByPacienteCpfAndExamTypeAndStatusAndIdNot(String cpf, ExamType examType, ConsultaStatus status,
            Integer id);

    Consulta findTopByOrderByIdDesc();

}
