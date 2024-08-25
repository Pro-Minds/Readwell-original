import React, { useEffect, useState } from 'react';
import { createKlass, getKlasses, updateKlass, deleteKlass } from '../../services/adminService';

const KlassManager = () => {
    const [klasses, setKlasses] = useState<any[]>([]);
    const [newKlass, setNewKlass] = useState({ name: '' });
    const [editingKlass, setEditingKlass] = useState<{ id?: number; name?: string }>({});

    useEffect(() => {
        const fetchKlasses = async () => {
            try {
                const data = await getKlasses();
                setKlasses(data);
            } catch (error) {
                console.error('Error fetching klasses:', error);
            }
        };
        fetchKlasses();
    }, []);

    const handleCreate = async () => {
        try {
            const data = await createKlass(newKlass);
            setKlasses([...klasses, data]);
            setNewKlass({ name: '' });
        } catch (error) {
            console.error('Error creating klass:', error);
        }
    };

    const handleUpdate = async () => {
        if (!editingKlass.id) return;
        try {
            const data = await updateKlass(editingKlass.id, { name: editingKlass.name });
            setKlasses(klasses.map(klass => klass.id === data.id ? data : klass));
            setEditingKlass({});
        } catch (error) {
            console.error('Error updating klass:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteKlass(id);
            setKlasses(klasses.filter(klass => klass.id !== id));
        } catch (error) {
            console.error('Error deleting klass:', error);
        }
    };

    return (
        <div>
            <h2>Manage Klasses</h2>
            {/* Form for creating klass */}
            <input
                type="text"
                value={newKlass.name}
                onChange={(e) => setNewKlass({ name: e.target.value })}
                placeholder="Klass Name"
            />
            <button onClick={handleCreate}>Create Klass</button>

            {/* Form for updating klass */}
            {editingKlass.id && (
                <div>
                    <input
                        type="text"
                        value={editingKlass.name || ''}
                        onChange={(e) => setEditingKlass({ ...editingKlass, name: e.target.value })}
                        placeholder="Update Klass Name"
                    />
                    <button onClick={handleUpdate}>Update Klass</button>
                </div>
            )}

            <h3>Existing Klasses:</h3>
            <ul>
                {klasses.map((klass) => (
                    <li key={klass.id}>
                        {klass.name}
                        <button onClick={() => setEditingKlass({ id: klass.id, name: klass.name })}>Edit</button>
                        <button onClick={() => handleDelete(klass.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default KlassManager;
