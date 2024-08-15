package org.prominds.backendReadwell.admin.subject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/subjects")
public class SubjectController {
    @Autowired
    private SubjectService subjectService;

    @PostMapping
    public ResponseEntity<Subject> createSubject(@RequestBody Subject newSubject) {
        return ResponseEntity.ok(subjectService.createSubject(newSubject));
    }

    @GetMapping
    public ResponseEntity<List<Subject>> getAllSubjects() {
        return ResponseEntity.ok(subjectService.getAllSubjects());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subject> updateSubject(@PathVariable Long id, @RequestBody Subject updatedSubject) {
        return ResponseEntity.ok(subjectService.updateSubject(id, updatedSubject));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.noContent().build();
    }
}

