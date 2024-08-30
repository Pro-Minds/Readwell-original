package org.prominds.backendReadwell.admin.question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/admin/questions")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody Question newQuestion) {
        // Validate input data
        if (newQuestion.getOptions() == null || newQuestion.getCorrectAnswers() == null) {
            throw new IllegalArgumentException("Options and correct answers must be provided");
        }
        return ResponseEntity.ok(questionService.createQuestion(newQuestion));
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question updatedQuestion) {
        return ResponseEntity.ok(questionService.updateQuestion(id, updatedQuestion));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
}
