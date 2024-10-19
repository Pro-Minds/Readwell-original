import React from "react";
import ClassList from "./ClassList"; // Import ClassList to display classes
import styles from '../HomePageStyles.module.css';
const HomePage: React.FC = () => {
    return (
        <div className={styles.home}>
            <h1>Welcome to the Home Page!</h1>
            <ClassList /> {/* Render the ClassList component */}
        </div>
    );
};

export default HomePage;
