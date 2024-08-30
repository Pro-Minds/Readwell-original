package org.prominds.backendReadwell.admin.subject;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findByKlassId(Long klassId);
}
