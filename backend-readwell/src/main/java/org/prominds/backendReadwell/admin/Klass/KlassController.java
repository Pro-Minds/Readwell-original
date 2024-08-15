package org.prominds.backendReadwell.admin.Klass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/klasses")
public class KlassController {
    @Autowired
    private KlassService klassService;

    @PostMapping
    public ResponseEntity<Klass> createKlass(@RequestBody Klass newKlass) {
        return ResponseEntity.ok(klassService.createKlass(newKlass));
    }

    @GetMapping
    public ResponseEntity<List<Klass>> getAllKlasses() {
        return ResponseEntity.ok(klassService.getAllKlasses());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Klass> updateKlass(@PathVariable Long id, @RequestBody Klass updatedKlass) {
        return ResponseEntity.ok(klassService.updateKlass(id, updatedKlass));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKlass(@PathVariable Long id) {
        klassService.deleteKlass(id);
        return ResponseEntity.noContent().build();
    }
}

