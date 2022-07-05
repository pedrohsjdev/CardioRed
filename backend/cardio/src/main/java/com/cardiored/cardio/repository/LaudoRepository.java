package com.cardiored.cardio.repository;

import org.springframework.stereotype.Repository;

import com.cardiored.cardio.domain.Laudo;
import com.cardiored.cardio.domain.LaudoStatus;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface LaudoRepository extends JpaRepository<Laudo, Integer> {

    Page<Laudo> findAllByStatusNot(@Param("status") LaudoStatus status, Pageable pageable);

    Page<Laudo> findAllByStatusOrMedicoCrm(@Param("status") LaudoStatus status, @Param("crm") String crm,
            Pageable pageable);

    Page<Laudo> findAllByPacienteNameContains(@Param("name") String name, Pageable pageable);

    Page<Laudo> findAllByPacienteNameContainsAndStatus(@Param("name") String name,
            @Param("status") LaudoStatus status, Pageable pageable);

    Page<Laudo> findAllByPacienteNameContainsAndStatusOrPacienteNameContainsAndMedicoCrm(
            @Param("name") String nameoaciente,
            @Param("status") LaudoStatus status, @Param("name") String name,
            @Param("crm") String crm, Pageable pageable);

    Page<Laudo> findAllByPacienteCpfContains(@Param("cpf") String cpf, Pageable pageable);

    Page<Laudo> findAllByPacienteCpfContainsAndStatus(@Param("cpf") String cpf,
            @Param("status") LaudoStatus status, Pageable pageable);

    Page<Laudo> findAllByPacienteCpfContainsAndStatusOrPacienteCpfContainsAndMedicoCrm(
            @Param("cpf") String cpfpaciente,
            @Param("status") LaudoStatus status, @Param("name") String cpf,
            @Param("crm") String crm, Pageable pageable);

    Laudo findTopByOrderByIdDesc();
}
