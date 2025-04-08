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

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const dto = { username, password };
            const response = await Login.login(dto);
            localStorage.setItem('jwtToken', response);
            if (response) {
                // Dispatch custom event to notify header of login
                window.dispatchEvent(new Event('authChange'));
                history('/in');
            } else {
                setError(response?.message || "Invalid username or password");
            }
        } catch (error) {
            setError(error.response?.data?.message || 
                    error.message || 
                    "Login failed. Please try again.");
        }
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const user = { username, password };
            await AuthService.readregister(user);
            history('/in');
        } catch (error) {
            setError(error.response?.data?.message || 
                    error.message || 
                    "Registration failed. Please try again.");
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h2>{isLogin ? 'Login Form' : 'Registration Form'}</h2>
            <form onSubmit={isLogin ? handleLogin : handleRegistration}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
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
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Registration' : 'Switch to Login'}
            </button>
        </div>
    );
};

export default Registration;
