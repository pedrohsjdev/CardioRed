package com.cardiored.cardio.repository;

import com.cardiored.cardio.domain.Docente;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DocenteRepository extends JpaRepository<Docente, Integer> {
    
}
