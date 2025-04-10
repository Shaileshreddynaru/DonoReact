import React, { useState } from 'react';
import AuthService from '../service/AuthService';
import { useNavigate } from 'react-router-dom';
import Login from '../service/Login';

const Registration = () => {
    const [isLogin, setIsLogin] = useState(true);
    const history = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const dto = { username, password };
            const response = await Login.login(dto);
            localStorage.setItem('jwtToken', response);
            window.dispatchEvent(new Event('authChange'));
            history('/in');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 
                              error.response?.data?.error ||
                              (error.response?.status === 401 ? "Invalid credentials" : 
                              error.message || "Login failed. Please try again.");
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const validateInputs = () => {
        if (username.length < 4) {
            setError('Username must be at least 4 characters');
            return false;
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            setError('Username can only contain letters, numbers and underscores');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            setError('Password must contain at least one number and one uppercase letter');
            return false;
        }
        return true;
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!validateInputs()) {
            setLoading(false);
            return;
        }

        try {
            const user = { username, password };
            const response = await AuthService.readregister(user);
            setSuccess(response?.message || "Registration successful!");
            setUsername('');
            setPassword('');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 
                              error.response?.data?.error ||
                              (error.response?.status === 401 ? "Registration failed - user may already exist" : 
                              error.message || "Registration failed. Please try again.");
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h2>{isLogin ? 'Login Form' : 'Registration Form'}</h2>
            <form onSubmit={isLogin ? handleLogin : handleRegistration}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
            <button type="submit" disabled={loading}>
                {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
            </button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Registration' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default Registration;
