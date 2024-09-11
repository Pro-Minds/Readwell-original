package org.prominds.backendReadwell.admin.question;

import org.prominds.backendReadwell.admin.answer.Answer;
import org.prominds.backendReadwell.admin.answer.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    public Question createQuestion(Question newQuestion) {
        if (newQuestion.getOptions() == null) {
            newQuestion.setOptions(new ArrayList<>());
        }
        if (newQuestion.getCorrectAnswers() == null) {
            newQuestion.setCorrectAnswers(new ArrayList<>());
        }

        // Save the question first to generate its ID
        Question savedQuestion = questionRepository.save(newQuestion);

        // Create and save answers based on options
        for (String option : newQuestion.getOptions()) {
            if (option != null && !option.trim().isEmpty()) {
                Answer answer = new Answer();
                answer.setQuestion(savedQuestion);
                answer.setSelectedOption(option);
                answer.setCorrect(newQuestion.getCorrectAnswers().contains(option));
                answerRepository.save(answer);
            }
        }

        return savedQuestion; // Return the saved question
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    public Question updateQuestion(Long id, Question updatedQuestion) {
        updatedQuestion.setId(id);
        return questionRepository.save(updatedQuestion);
    }

    // Fetch questions by topic ID
    public List<Question> getQuestionsByTopicId(Long topicId) {
        return questionRepository.findByTopicId(topicId);
    }
}


