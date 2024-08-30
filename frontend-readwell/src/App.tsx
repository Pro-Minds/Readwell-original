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
import HomePage from "./components/user/HomePage";
import UserRegistrationForm from "./components/UserRegistrationForm";
import SubjectList from "./components/user/SubjectList";
import TopicList from "./components/user/TopicList";
import QuestionList from "./components/user/QuestionList";

const App = () => {
    return (
        <Router>
            <Routes>
                {/* User Authentication Routes */}
                <Route path="/admin/register" element={<RegistrationForm />} />
                <Route path="/register" element={<UserRegistrationForm />} />
                <Route path="/admin/login" element={<LoginForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/admin/verify-otp" element={<OTPVerification />} />
                <Route path="/verify-otp" element={<OTPVerification />} />

                {/* User Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/subjects/:klassId" element={<SubjectList />} />
                <Route path="/topics/:subjectId" element={<TopicList />} />
                <Route path="/questions/:topicId" element={<QuestionList />} />

                {/* Admin Protected Routes */}
                <Route
                    path="/admin/panel"
                    element={<ProtectedRoute component={AdminPanel} allowedRoles={['ADMIN']} />}
                />
                <Route
                    path="/admin/manage-klasses"
                    element={<ProtectedRoute component={KlassManager} allowedRoles={['ADMIN']} />}
                />
                <Route
                    path="/admin/manage-subjects"
                    element={<ProtectedRoute component={SubjectManager} allowedRoles={['ADMIN']} />}
                />
                <Route
                    path="/admin/manage-topics"
                    element={<ProtectedRoute component={TopicManager} allowedRoles={['ADMIN']} />}
                />
                <Route
                    path="/admin/manage-questions"
                    element={<ProtectedRoute component={QuestionManager} allowedRoles={['ADMIN']} />}
                />

                {/* Redirect any unmatched routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
};

export default App;
