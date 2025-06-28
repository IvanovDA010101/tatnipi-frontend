import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthRequest } from './redux/actions/authActions.js';

import Header from './layouts/header/Header.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import { Dashboard } from './pages/Dashboard/Dashboard.jsx';
import { Profile } from './pages/Profile/Profile.jsx';
import Settings from './pages/Settings/Settings.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.jsx';

import styles from './App.module.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isInitialized } = useSelector(state => state.auth);

    if (!isInitialized) {
        return <LoadingSpinner fullScreen text="Проверка авторизации..." />;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to dashboard if authenticated)
const PublicRoute = ({ children }) => {
    const { isAuthenticated, isInitialized } = useSelector(state => state.auth);

    if (!isInitialized) {
        return <LoadingSpinner fullScreen text="Проверка авторизации..." />;
    }

    // ИСПРАВЛЕНО: Завершена логика PublicRoute
    return !isAuthenticated ? children : <Navigate to="/dash" replace />;
};

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isInitialized, loading } = useSelector(state => state.auth);

    // Check authentication on app start
    useEffect(() => {
        dispatch(checkAuthRequest());
    }, [dispatch]);

    // Show loading overlay during initial auth check
    if (!isInitialized && loading) {
        return (
            <div className={styles.loadingOverlay}>
                <LoadingSpinner fullScreen text="Загрузка приложения..." />
            </div>
        );
    }

    // Show header only on protected routes (not on login/register)
    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    return (
        <div className={styles.appContainer}>
            <div className={styles.mainContent}>
                {!isAuthPage && <Header />}

                <main className={isAuthPage ? styles.authPage : styles.protectedPage}>
                    <Routes>
                        {/* Public Routes */}
                        <Route
                            path="/login"
                            element={
                                <PublicRoute>
                                    <Login />
                                </PublicRoute>
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                <PublicRoute>
                                    <Register />
                                </PublicRoute>
                            }
                        />

                        {/* Protected Routes */}
                        <Route
                            path="/dash"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/settings"
                            element={
                                <ProtectedRoute>
                                    <Settings />
                                </ProtectedRoute>
                            }
                        />

                        {/* Default redirect */}
                        <Route
                            path="/"
                            element={<Navigate to="/dash" replace />}
                        />

                        {/* 404 Not Found */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default App;