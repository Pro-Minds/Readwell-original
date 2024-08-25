import React, { useEffect, useState } from 'react';
import { createSubject, getSubjects, updateSubject, deleteSubject } from '../../services/adminService';
import { getKlasses } from '../../services/adminService';

const SubjectManager = () => {
    const [subjects, setSubjects] = useState<any[]>([]);
    const [klasses, setKlasses] = useState<any[]>([]);
    const [newSubject, setNewSubject] = useState({ name: '', klass: { id: 0 } });
    const [editingSubject, setEditingSubject] = useState<{ id?: number; name?: string; klass?: number }>({});

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const data = await getSubjects();
                setSubjects(data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        const fetchKlasses = async () => {
            try {
                const data = await getKlasses();
                setKlasses(data);
            } catch (error) {
                console.error('Error fetching klasses:', error);
            }
        };

        fetchSubjects();
        fetchKlasses();
    }, []);

    const handleCreate = async () => {
        if (newSubject.klass.id === 0) {
            alert('Please select a class.');
            return;
        }

        try {
            const data = await createSubject(newSubject);
            setSubjects([...subjects, data]);
            setNewSubject({ name: '', klass: { id: 0 } });
        } catch (error) {
            console.error('Error creating subject:', error);
        }
    };

    const handleUpdate = async () => {
        if (!editingSubject.id) return;
        try {
            const data = await updateSubject(editingSubject.id, {
                name: editingSubject.name,
                klass: { id: editingSubject.klass || 0 }
            });
            setSubjects(subjects.map(subject => subject.id === data.id ? data : subject));
            setEditingSubject({});
        } catch (error) {
            console.error('Error updating subject:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteSubject(id);
            setSubjects(subjects.filter(subject => subject.id !== id));
        } catch (error) {
            console.error('Error deleting subject:', error);
        }
    };

    return (
        <div>
            <h2>Manage Subjects</h2>
            {/* Form for creating subject */}
            <input
                type="text"
                value={newSubject.name}
                onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                placeholder="Subject Name"
            />
            <select
                onChange={(e) => setNewSubject({ ...newSubject, klass: { id: parseInt(e.target.value) } })}
                value={newSubject.klass.id}
            >
                <option value={0}>Select Class</option>
                {klasses.map(klass => (
                    <option key={klass.id} value={klass.id}>{klass.name}</option>
                ))}
            </select>
            <button onClick={handleCreate}>Create Subject</button>

            {/* Form for updating subject */}
            {editingSubject.id && (
                <div>
                    <input
                        type="text"
                        value={editingSubject.name || ''}
                        onChange={(e) => setEditingSubject({ ...editingSubject, name: e.target.value })}
                        placeholder="Update Subject Name"
                    />
                    <select
                        onChange={(e) => setEditingSubject({ ...editingSubject, klass: parseInt(e.target.value) })}
                        value={editingSubject.klass}
                    >
                        <option value={0}>Select Class</option>
                        {klasses.map(klass => (
                            <option key={klass.id} value={klass.id}>{klass.name}</option>
                        ))}
                    </select>
                    <button onClick={handleUpdate}>Update Subject</button>
                </div>
            )}

            <h3>Existing Subjects:</h3>
            <ul>
                {subjects.map((subject) => (
                    <li key={subject.id}>
                        {subject.name}
                        <button onClick={() => setEditingSubject({ id: subject.id, name: subject.name, klass: subject.klass.id })}>Edit</button>
                        <button onClick={() => handleDelete(subject.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubjectManager;
