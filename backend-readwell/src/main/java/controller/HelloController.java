package controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @CrossOrigin
    @GetMapping("/api/hello")
    public String hello() {
        return "Hello World from Spring Boot!";
    }
}
