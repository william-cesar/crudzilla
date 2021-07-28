package com.example.cadastroback.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class StudentSubscriptionDTO {

    @NotNull
    private String name;

    @NotNull
    private String address;

}
