package com.cardiored.cardio.repository;

import com.cardiored.cardio.domain.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiseaseRepository extends JpaRepository<Disease, Integer> {

    List<Disease> findAllByCodeContains(@Param("code") String code);

    List<Disease> findAllByNameContains(@Param("name") String name);
}
