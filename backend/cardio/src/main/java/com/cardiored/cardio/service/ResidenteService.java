package com.cardiored.cardio.service;

import javax.transaction.Transactional;

import com.cardiored.cardio.domain.Residente;
import com.cardiored.cardio.repository.ResidenteRepository;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ResidenteService {
    private final ResidenteRepository residenteRepository;

    public Residente findByIdOrThrowException(Integer id) {
        return residenteRepository.findById(id).orElseThrow(() -> new RuntimeException("Residente not found!"));
    }

    @Transactional
    public Residente save(Residente residente) {
        Residente residenteFound = findByIdOrThrowException(residente.getId());
        if(residenteFound == null) {
            return residenteRepository.save(residente);
        }
        throw new RuntimeException("Residente already exists!");
    }

    public void delete(Integer id) {
        residenteRepository.delete(findByIdOrThrowException(id));
    }

    public void replace(Residente residente) {
        findByIdOrThrowException(residente.getId());
        residenteRepository.save(residente);
    } 
}
