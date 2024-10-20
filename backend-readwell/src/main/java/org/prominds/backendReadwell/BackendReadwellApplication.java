package org.prominds.backendReadwell;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.core.JdbcTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "org.prominds.backendReadwell")
@EntityScan(basePackages = "org.prominds.backendReadwell")
public class BackendReadwellApplication implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(BackendReadwellApplication.class);

	@Autowired
	private JdbcTemplate jdbcTemplate;

	public static void main(String[] args) {
		SpringApplication.run(BackendReadwellApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		logger.info("Backend service started.");
		try {
			jdbcTemplate.execute("SELECT 1"); // Simple query to check DB connection
			logger.info("Successfully connected to the database.");
		} catch (Exception e) {
			logger.error("Failed to connect to the database: {}", e.getMessage());
		}

		// Log environment variables
		logger.info("POSTGRES_DB: {}", System.getProperty("POSTGRES_DB"));
		logger.info("POSTGRES_USER: {}", System.getProperty("POSTGRES_USER"));
		logger.info("POSTGRES_PASSWORD: {}", System.getProperty("POSTGRES_PASSWORD"));
		logger.info("SPRING_SECURITY_JWT_SECRET_KEY: {}", System.getProperty("SPRING_SECURITY_JWT_SECRET_KEY"));
		logger.info("SPRING_SECURITY_JWT_EXPIRATION: {}", System.getProperty("SPRING_SECURITY_JWT_EXPIRATION"));
		logger.info("SPRING_MAIL_HOST: {}", System.getProperty("SPRING_MAIL_HOST"));
		logger.info("SPRING_MAIL_PORT: {}", System.getProperty("SPRING_MAIL_PORT"));
		logger.info("SPRING_MAIL_USERNAME: {}", System.getProperty("SPRING_MAIL_USERNAME"));
		logger.info("SPRING_MAIL_PASSWORD: {}", System.getProperty("SPRING_MAIL_PASSWORD"));
	}

}
