package com.example.cadastroback.exceptions;

public class CustomNotFoundException extends RuntimeException {

    public CustomNotFoundException(String message){

        super(message);
    }
}