package org.prominds.backendReadwell.admin.question;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.prominds.backendReadwell.admin.topic.Topic;

import java.util.List;

@Entity
@Table(name = "questions")
@Getter
@Setter
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String questionText;

    @ElementCollection
    private List<String> options;

    private String correctAnswer;

    @ManyToOne
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic; // Associate with Topic
}

