import React from 'react';
import { logout } from '../../security/AuthService';
import {Link} from "react-router-dom";

const AdminPanel = () => {

    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            <h2>Welcome to the Admin Panel</h2>
            <Link to="/admin/manage-klasses">Manage Klasses</Link><br/>
            <Link to="/admin/manage-subjects">Manage Subjects</Link><br/>
            <Link to="/admin/manage-topics">Manage Topics</Link><br/>
            <Link to="/admin/manage-questions">Manage Questions</Link><br/>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminPanel;
