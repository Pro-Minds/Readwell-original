package org.prominds.backendReadwell.admin.Klass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KlassService {
    @Autowired
    private KlassRepository klassRepository;

    public Klass createKlass(Klass newKlass) {
        return klassRepository.save(newKlass);
    }

    public List<Klass> getAllKlasses() {
        return klassRepository.findAll();
    }

    public void deleteKlass(Long id) {
        klassRepository.deleteById(id);
    }

    public Klass updateKlass(Long id, Klass updatedKlass) {
        updatedKlass.setId(id);
        return klassRepository.save(updatedKlass);
    }
}

