import React from 'react';
import { logout } from '../../security/AuthService';
import {Link} from "react-router-dom";
import styles from '../../components/AdminStyles.module.css';
const AdminPanel = () => {

    const handleLogout = () => {
        logout();
    };

    return (
        <div className={styles.home}>
            <div className={styles.adminUI}>
                <h2 className={styles.head}>Welcome to the Admin Panel</h2>
                <Link className={styles.link} to="/admin/manage-klasses">Manage Klasses</Link><br/>
                <Link className={styles.link} to="/admin/manage-subjects">Manage Subjects</Link><br/>
                <Link className={styles.link} to="/admin/manage-topics">Manage Topics</Link><br/>
                <Link className={styles.link} to="/admin/manage-questions">Manage Questions</Link><br/>
            </div>
            <div className={styles.logout}>
                <button className={styles.btn} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default AdminPanel;
