package com.example.cadastroback.repository;

import com.example.cadastroback.model.PhotoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PhotoRepository extends JpaRepository<PhotoModel, Long> {
    Optional<PhotoModel> findByStudentId(Long id);
}
