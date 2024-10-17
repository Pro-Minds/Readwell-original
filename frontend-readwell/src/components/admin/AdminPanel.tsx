import React from 'react';
import { logout } from '../../security/AuthService';
import {Link} from "react-router-dom";
import styles from '../../components/AdminStyles.module.css';
const AdminPanel = () => {

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={styles.adminUI}>
            <h2 className={styles.head}>Welcome to the Admin Panel</h2>
            <Link className={styles.link} to="/admin/manage-klasses">Manage Klasses</Link><br/>
            <Link className={styles.link} to="/admin/manage-subjects">Manage Subjects</Link><br/>
            <Link className={styles.link} to="/admin/manage-topics">Manage Topics</Link><br/>
            <Link className={styles.link} to="/admin/manage-questions">Manage Questions</Link><br/>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminPanel;
