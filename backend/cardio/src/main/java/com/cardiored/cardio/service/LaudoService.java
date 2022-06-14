package com.cardiored.cardio.service;

import com.cardiored.cardio.domain.Laudo;
import com.cardiored.cardio.mapper.LaudoMapper;
import com.cardiored.cardio.repository.LaudoRepository;
import com.cardiored.cardio.request.laudo.LaudoPostDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class LaudoService {

    private final LaudoRepository laudoRepository;

    public Page<Laudo> pageAll(Pageable pageable){
        return laudoRepository.findAll(pageable);
    }

    public Laudo findById(Integer id){
        return laudoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Laudo not found"));
    }

    public List<Laudo> findByPacienteName(String name){
        return laudoRepository.findAllByPacienteName(name);
    }
    public List<Laudo> findByPacienteCpf(String cpf){
        return laudoRepository.findAllByPacienteCpf(cpf);
    }

    public Laudo save(LaudoPostDTO laudoPostDTO){
        Laudo Laudo = LaudoMapper.INSTANCE.toLaudo(laudoPostDTO);
        return laudoRepository.save(Laudo);
    }

    public void delete(Integer id){
        laudoRepository.delete(findById(id));
    }

    public void replace(Laudo laudo){
        Laudo savedLaudo = findById(laudo.getId());
        Laudo Laudo = LaudoMapper.INSTANCE.toLaudo(laudo);
        Laudo.setId(savedLaudo.getId());
        laudoRepository.save(Laudo);
    }




}
