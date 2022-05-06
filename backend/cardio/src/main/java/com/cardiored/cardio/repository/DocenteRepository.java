package com.cardiored.cardio.repository;

import com.cardiored.cardio.domain.Docente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocenteRepository extends JpaRepository<Docente, Integer> {
    
}
