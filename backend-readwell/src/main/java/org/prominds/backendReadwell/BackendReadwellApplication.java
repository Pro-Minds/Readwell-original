package org.prominds.backendReadwell;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.core.JdbcTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "org.prominds.backendReadwell")
public class BackendReadwellApplication implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(BackendReadwellApplication.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public static void main(String[] args) {
		SpringApplication.run(BackendReadwellApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		try {
			jdbcTemplate.execute("SELECT 1"); // Simple query to check DB connection
			logger.info("Successfully connected to the database.");
		} catch (Exception e) {
			logger.error("Failed to connect to the database: {}", e.getMessage());
		}
	}
}
