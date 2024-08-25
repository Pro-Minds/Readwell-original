import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import AdminPanel from './components/admin/AdminPanel';
import KlassManager from './components/admin/KlassManager';
import SubjectManager from './components/admin/SubjectManager';
import TopicManager from './components/admin/TopicManager';
import QuestionManager from './components/admin/QuestionManager';
import OTPVerification from './components/OTPVerification';
import ProtectedRoute from './security/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                {/*<Route path="/" element={<Navigate to="/admin/login" replace />} />*/}
                <Route path="/admin/register" element={<RegistrationForm />} />
                <Route path="/admin/login" element={<LoginForm />} />
                <Route path="/admin/verify-otp" element={<OTPVerification />} />
                <Route
                    path="/admin/panel"
                    element={<ProtectedRoute component={AdminPanel} />}
                />
                {/* Catch-all route */}
                <Route path="*" element={<Navigate to="/admin/login" replace />} />                <Route
                path="/admin/manage-klasses"
                element={<ProtectedRoute component={KlassManager} />}
            />
                <Route
                    path="/admin/manage-subjects"
                    element={<ProtectedRoute component={SubjectManager} />}
                />
                <Route
                    path="/admin/manage-topics"
                    element={<ProtectedRoute component={TopicManager} />}
                />
                <Route
                    path="/admin/manage-questions"
                    element={<ProtectedRoute component={QuestionManager} />}
                />
                <Route path="*" element={<Navigate to="/admin/login" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
