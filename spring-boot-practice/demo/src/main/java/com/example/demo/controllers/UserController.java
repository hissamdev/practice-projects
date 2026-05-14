package com.example.demo.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @GetMapping("/users")
    public Map<String, String> getUsers() {
        return Map.of(
            "hi", "aha"
        );
    }
}