package com.example.cadastroback.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class StudentDTO {

    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String address;
}
