package org.prominds.backendReadwell.admin.question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    @Autowired
    private QuestionRepository questionRepository;

    public Question createQuestion(Question newQuestion) {
        return questionRepository.save(newQuestion);
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
}

