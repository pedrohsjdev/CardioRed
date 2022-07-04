package com.cardiored.cardio.repository;

import java.util.List;
import com.cardiored.cardio.domain.Medico;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Integer> {

    List<Medico> findByName(String name);

    Page<Medico> findByNameContains(@Param("name") String name, Pageable pageable);

    Page<Medico> findByCrmContains(@Param("crm") String crm, Pageable pageable);

    Medico findByCrm(String crm);

}
