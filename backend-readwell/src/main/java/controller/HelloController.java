package controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

@RestController
public class HelloController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @CrossOrigin
    @GetMapping("/api/hello")
    public List<String> hello() {
        return jdbcTemplate.query("SELECT message FROM test_data", (rs, rowNum) -> rs.getString("message"));
    }
}
