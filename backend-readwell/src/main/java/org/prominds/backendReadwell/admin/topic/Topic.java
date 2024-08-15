package org.prominds.backendReadwell.admin.topic;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.prominds.backendReadwell.admin.subject.Subject;

@Entity
@Table(name = "topics")
@Getter
@Setter
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject; // Associate with Subject
}
