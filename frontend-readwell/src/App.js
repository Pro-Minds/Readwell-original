import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import AdminPanel from './components/admin/AdminPanel';
import ProtectedRoute from './security/ProtectedRoute';
import Unauthenticated from './security/Unauthenticated';
import OTPVerification from './components/OTPVerification';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/admin/register" element={<RegistrationForm />} />
                {/*<Route path="/admin/login" element={<LoginForm />} />*/}
                {/*<Route path="/admin/verify-otp" element={<OTPVerification />} />*/}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminPanel />
                        </ProtectedRoute>
                    }
                />
                {/*<Route path="/unauthenticated" element={<Unauthenticated />} />*/}
            </Routes>
        </Router>
    );
};

export default App;
