package org.prominds.backendReadwell.admin.answer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/answers")
public class AnswerController {
    @Autowired
    private AnswerService answerService;

    @PostMapping
    public ResponseEntity<Answer> createAnswer(@RequestBody Answer newAnswer) {
        return ResponseEntity.ok(answerService.saveAnswer(newAnswer));
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<List<Answer>> getAnswersByQuestionId(@PathVariable Long questionId) {
        return ResponseEntity.ok(answerService.getAnswersByQuestionId(questionId));
    }
}

