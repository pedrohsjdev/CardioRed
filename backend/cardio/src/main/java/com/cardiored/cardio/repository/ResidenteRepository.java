package com.cardiored.cardio.repository;

import com.cardiored.cardio.domain.Residente;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResidenteRepository extends JpaRepository<Residente, Integer> {
    
}
