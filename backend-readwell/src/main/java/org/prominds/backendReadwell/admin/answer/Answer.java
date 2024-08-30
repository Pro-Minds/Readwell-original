package org.prominds.backendReadwell.admin.answer;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.prominds.backendReadwell.admin.question.Question;

@Entity
@Table(name = "answers")
@Getter
@Setter
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    private String selectedOption;

    private boolean isCorrect;

    // Getter and Setter for isCorrect
    public boolean isCorrect() {
        return isCorrect;
    }

    public void setCorrect(boolean correct) {
        isCorrect = correct;
    }
}
