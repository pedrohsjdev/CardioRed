package com.cardiored.cardio.service;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.cardiored.cardio.domain.Consulta;
import com.cardiored.cardio.domain.ConsultaStatus;
import com.cardiored.cardio.domain.ExamType;
import com.cardiored.cardio.repository.ConsultaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ConsultaService {
    private final ConsultaRepository consultaRepository;
    private final PacienteService pacienteService;

    public Page<Consulta> pageAll(Pageable pageable) {
        return consultaRepository.findAll(pageable);
    }

    public Page<Consulta> findAllByPacienteName(String name, Pageable pageable) {
        return consultaRepository.findAllByPacienteName(name, pageable);
    }

    public Page<Consulta> findAllByPacienteNameContains(String name, Pageable pageable) {
        return consultaRepository.findAllByPacienteNameContains(name, pageable);
    }

    public Page<Consulta> findAllByPacienteCpf(String cpf, Pageable pageable) {
        return consultaRepository.findAllByPacienteCpf(cpf, pageable);
    }

    public Page<Consulta> findAllByPacienteCpfContains(String cpf, Pageable pageable) {
        return consultaRepository.findAllByPacienteCpfContains(cpf, pageable);
    }

    public Consulta findByIdOrThrowException(Integer id) {
        return consultaRepository.findById(id).orElseThrow(() -> new RuntimeException("Consulta not found!"));
    }

    public Integer getLastId() {
        return consultaRepository.findTopByOrderByIdDesc().getId();
    }

    public boolean existsByPacienteCpf(String cpf) {
        return consultaRepository.existsByPacienteCpf(cpf);
    }

    public boolean existsByMedicoCrm(String crm) {
        return consultaRepository.existsByMedicoCrm(crm);
    }

    public Consulta findByPacienteCpfAndExamTypeAndStatus(String cpf, ExamType examType, ConsultaStatus status) {
        return consultaRepository.findByPacienteCpfAndExamTypeAndStatus(cpf, examType, status);
    }

    public Boolean existConsultaWithPacienteAndExamType(Consulta consulta) {
        return consultaRepository.existsByPacienteCpfAndExamTypeAndStatus(
                pacienteService.findById(consulta.getPaciente().getId()).getCpf(),
                consulta.getExamType(),
                ConsultaStatus.AGUARDANDO_EXAME);
    }

    public Boolean existConsultaWithPacienteAndExamTypeAndNotId(Consulta consulta) {
        return consultaRepository.existsByPacienteCpfAndExamTypeAndStatusAndIdNot(
                pacienteService.findById(consulta.getPaciente().getId()).getCpf(),
                consulta.getExamType(),
                ConsultaStatus.AGUARDANDO_EXAME,
                consulta.getId());
    }

    public Consulta save(Consulta consulta) {
        // [Business rule] Verify if a consulta with the same exam type already
        // exists.
        Assert.isTrue(!consultaRepository.existsByPacienteCpfAndExamTypeAndStatus(
                pacienteService.findById(consulta.getPaciente().getId()).getCpf(),
                consulta.getExamType(),
                ConsultaStatus.AGUARDANDO_EXAME),
                "A Consulta with this same exam type already exists!");

        return consultaRepository.save(consulta);
    }

    public void replace(Consulta consulta) {
        // Verifiy if the consulta exists.
        findByIdOrThrowException(consulta.getId());

        // [Business rule] Verify if a consulta with the same exam type and different
        // from the Consulta being replaced already exists.
        Assert.isTrue(!consultaRepository.existsByPacienteCpfAndExamTypeAndStatusAndIdNot(
                pacienteService.findById(consulta.getPaciente().getId()).getCpf(),
                consulta.getExamType(),
                ConsultaStatus.AGUARDANDO_EXAME,
                consulta.getId()),
                "A Consulta with this same exam type already exists!");

        consultaRepository.save(consulta);
    }

    public void delete(Integer id) {
        consultaRepository.delete(findByIdOrThrowException(id));
    }
}
