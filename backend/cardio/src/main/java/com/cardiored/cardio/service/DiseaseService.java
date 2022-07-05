package com.cardiored.cardio.service;

import com.cardiored.cardio.domain.Disease;
import com.cardiored.cardio.repository.DiseaseRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.io.File;
import java.io.FileInputStream;

@Service
@RequiredArgsConstructor
@Transactional
public class DiseaseService {

    private final DiseaseRepository diseaseRepository;

    public List<Disease> findAllByCodeContains(String code) {
        return diseaseRepository.findAllByCodeContains(code);
    }

    public List<Disease> findAllByNameContains(String name) {
        return diseaseRepository.findAllByNameContains(name);
    }

    public Disease save(Disease disease) {
        return diseaseRepository.save(disease);
    }

    public boolean loadDiseases() {
        boolean loaded = false;

        try {
            File file = new File("cardio/src/cid10.json");
            System.out.println("path:" + file.getCanonicalPath());
            ObjectMapper mapper = new ObjectMapper();
            InputStream inputStream = new FileInputStream(new File("cardio/src/cid10.json"));
            TypeReference<List<Disease>> typeReference = new TypeReference<List<Disease>>() {
            };
            List<Disease> diseases = mapper.readValue(inputStream, typeReference);
            for (Disease d : diseases) {
                System.out.println("Cod: " + d.getCode() + " Nome:" + d.getName());
                save(d);
            }

        } catch (FileNotFoundException e) {
            System.out.println(e);

        } catch (IOException e) {
            System.out.println(e);

        }
        return loaded;
    }

}
