package com.cardiored.cardio.service;

import javax.transaction.Transactional;

import com.cardiored.cardio.domain.Docente;
import com.cardiored.cardio.repository.DocenteRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DocenteService {
    private final DocenteRepository docenteRepository;

    public Docente findByIdOrThrowException(Integer id) {
        return docenteRepository.findById(id).orElseThrow(() -> new RuntimeException("Docente not found!"));
    }

    @Transactional
    public Docente save(Docente docente) {
        Docente docenteFound = findByIdOrThrowException(docente.getId());
        if(docenteFound == null) {
            return docenteRepository.save(docente);
        }
        throw new RuntimeException("Docente already exists!");
    }

    public void delete(Integer id) {
        docenteRepository.delete(findByIdOrThrowException(id));
    }

    public void replace(Docente docente) {
        findByIdOrThrowException(docente.getId());
        docenteRepository.save(docente);
    } 
}
