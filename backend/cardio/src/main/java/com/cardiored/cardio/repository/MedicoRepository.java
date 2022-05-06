package com.cardiored.cardio.repository;

import java.util.List;

import com.cardiored.cardio.domain.Medico;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicoRepository extends JpaRepository<Medico, Integer> {
    
    List<Medico> findByName(String name);

    Medico findByCrm(String crm);

}
