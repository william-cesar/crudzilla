package com.example.cadastroback.model;

import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name= "photo")
@Data
public class PhotoModel {

    @Id
    @Column(name = "student_id")
    private Long studentId;

    @Lob
    @Type(type="org.hibernate.type.BinaryType")
    private byte[] photo;

}
