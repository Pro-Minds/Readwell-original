package org.prominds.backendReadwell;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"org.prominds.backendReadwell", "controller"})
public class BackendReadwellApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendReadwellApplication.class, args);
	}

}
