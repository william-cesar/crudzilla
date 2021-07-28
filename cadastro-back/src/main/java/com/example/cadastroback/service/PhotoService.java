package com.example.cadastroback.service;

import com.example.cadastroback.dto.ReturnMessage;
import com.example.cadastroback.exceptions.CustomNotFoundException;
import com.example.cadastroback.model.PhotoModel;
import com.example.cadastroback.repository.PhotoRepository;
import com.example.cadastroback.repository.StudentRepository;
import com.example.cadastroback.utils.Messages;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class PhotoService {

    private final PhotoRepository photoRepository;
    private final StudentRepository studentRepository;

    public PhotoService(PhotoRepository photoRepository, StudentRepository studentRepository) {
        this.photoRepository = photoRepository;
        this.studentRepository = studentRepository;
    }

    @Transactional
    public PhotoModel save(Long id, MultipartFile photo) throws CustomNotFoundException, IOException {
        studentRepository.findById(id).orElseThrow(() -> new CustomNotFoundException(Messages.STUDENT_NOT_FOUND));

        PhotoModel profilePhoto = new PhotoModel();
        profilePhoto.setStudentId(id);
        profilePhoto.setPhoto(photo.getBytes());

        return photoRepository.save(profilePhoto);
    }

    @Transactional
    public ReturnMessage deletePhoto(Long id) {
        Optional<PhotoModel> photo = photoRepository.findByStudentId(id);

        if (photo.isPresent()) {
            photoRepository.deleteById(id);
        }

        ReturnMessage returnMessage = new ReturnMessage();
        returnMessage.setMessage(Messages.REMOVED_PHOTO);

        return returnMessage;
    }
}
