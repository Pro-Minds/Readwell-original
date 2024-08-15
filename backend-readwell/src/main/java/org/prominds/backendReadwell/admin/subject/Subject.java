package org.prominds.backendReadwell.admin.subject;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.prominds.backendReadwell.admin.Klass.Klass;

@Entity
@Table(name = "subjects")
@Getter
@Setter
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "klass_id", nullable = false)
    private Klass klass; // Associate with Klass
}
