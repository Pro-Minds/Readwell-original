package org.prominds.backendReadwell.admin.question;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.prominds.backendReadwell.admin.topic.Topic;

import java.util.ArrayList;
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
    @CollectionTable(name = "question_options", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "option_value")
    private List<String> options = new ArrayList<>();    

    @ElementCollection
    @CollectionTable(name = "correct_answers", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "answer_value")
    private List<String> correctAnswers = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic; 
}

