package com.cardiored.cardio.repository;

import java.util.List;

import com.cardiored.cardio.domain.Medico;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Integer> {
    
    List<Medico> findByName(String name);

    Medico findByCrm(String crm);

}
