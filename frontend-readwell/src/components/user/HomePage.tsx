import React from "react";
import ClassList from "./ClassList"; // Import ClassList to display classes

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <ClassList /> {/* Render the ClassList component */}
        </div>
    );
};

export default HomePage;
