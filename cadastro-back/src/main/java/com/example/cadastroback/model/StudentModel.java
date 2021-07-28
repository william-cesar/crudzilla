package com.example.cadastroback.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "student")
@Data
public class StudentModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    private String address;

    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "studend_Id")
    private PhotoModel photo;

}
