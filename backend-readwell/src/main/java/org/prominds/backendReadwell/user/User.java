package org.prominds.backendReadwell.user;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table; // Import the Table annotation
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "readwell_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String password;

    private boolean isAdmin;
}
