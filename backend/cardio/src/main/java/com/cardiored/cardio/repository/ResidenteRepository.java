package com.cardiored.cardio.repository;

import com.cardiored.cardio.domain.Residente;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ResidenteRepository extends JpaRepository<Residente, Integer> {
    
}
