package com.cardiored.cardio.repository;

import org.springframework.stereotype.Repository;

import com.cardiored.cardio.domain.Laudo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface LaudoRepository extends JpaRepository<Laudo, Integer> {

    List<Laudo> findAllByPacienteName(String name);

    List<Laudo> findAllByPacienteCpf(String cpf);
}
