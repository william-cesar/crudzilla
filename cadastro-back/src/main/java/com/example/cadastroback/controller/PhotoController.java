package com.example.cadastroback.controller;

import com.example.cadastroback.dto.ReturnMessage;
import com.example.cadastroback.exceptions.CustomNotFoundException;
import com.example.cadastroback.model.PhotoModel;
import com.example.cadastroback.service.PhotoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping(value = "/photos")
public class PhotoController {

    private final PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @PostMapping(value = "/{id}")
    public ResponseEntity<PhotoModel> savePhoto(
            @PathVariable Long id, @RequestBody MultipartFile photo) throws IOException, CustomNotFoundException {
        return ResponseEntity.status(HttpStatus.CREATED).body(photoService.save(id, photo));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<ReturnMessage> deletePhoto(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(photoService.deletePhoto(id));
    }
}
