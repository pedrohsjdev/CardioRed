package com.cardiored.cardio.service;

import com.cardiored.cardio.domain.Consulta;
import com.cardiored.cardio.domain.ConsultaStatus;
import com.cardiored.cardio.domain.Laudo;
import com.cardiored.cardio.domain.LaudoStatus;
import com.cardiored.cardio.mapper.LaudoMapper;
import com.cardiored.cardio.repository.ConsultaRepository;
import com.cardiored.cardio.repository.LaudoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class LaudoService {

    private final LaudoRepository laudoRepository;
    private final PacienteService pacienteService;
    private final ConsultaRepository consultaRepository;

    public Page<Laudo> pageAll(Pageable pageable) {
        return laudoRepository.findAll(pageable);
    }

    public Page<Laudo> pageAllStatusNot(LaudoStatus status, Pageable pageable) {
        return laudoRepository.findAllByStatusNot(status, pageable);
    }

    public Laudo findByIdOrThrowException(Integer id) {
        return laudoRepository.findById(id).orElseThrow(() -> new RuntimeException("Laudo not found!"));
    }

    public Page<Laudo> findAllByPacienteNameContains(String name, Pageable pageable) {
        return laudoRepository.findAllByPacienteNameContains(name, pageable);
    }

    public Page<Laudo> findAllByPacienteCpfContains(String cpf, Pageable pageable) {
        return laudoRepository.findAllByPacienteCpfContains(cpf, pageable);
    }

    public Integer getLastId() {
        return laudoRepository.findTopByOrderByIdDesc().getId();
    }

    public Boolean existConsultaWithPacienteAndExamType(Laudo laudo) {
        return consultaRepository.existsByPacienteCpfAndExamTypeAndStatus(
                pacienteService.findById(laudo.getPaciente().getId()).getCpf(),
                laudo.getExamType(),
                ConsultaStatus.AGUARDANDO_LAUDO);
    }

    public Laudo save(Laudo laudo) {
        Consulta consulta = laudo.getConsulta();
        consulta.setStatus(ConsultaStatus.LAUDO_EMITIDO);
        consultaRepository.save(consulta);
        return laudoRepository.save(laudo);
    }

    public void delete(Integer id) {
        laudoRepository.delete(findByIdOrThrowException(id));
    }

    public void replace(Laudo laudo) {
        Laudo savedLaudo = findByIdOrThrowException(laudo.getId());
        Laudo Laudo = LaudoMapper.INSTANCE.toLaudo(laudo);
        Laudo.setId(savedLaudo.getId());
        laudoRepository.save(Laudo);
    }

}
