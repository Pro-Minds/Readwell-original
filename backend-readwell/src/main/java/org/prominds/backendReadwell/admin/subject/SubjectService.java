package org.prominds.backendReadwell.admin.subject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository subjectRepository;

    public Subject createSubject(Subject newSubject) {
        return subjectRepository.save(newSubject);
    }

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }

    public Subject updateSubject(Long id, Subject updatedSubject) {
        updatedSubject.setId(id);
        return subjectRepository.save(updatedSubject);
    }
}

