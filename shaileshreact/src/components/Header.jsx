import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import ThreeLine from './threeLine';
import jwtDecode from 'jwt-decode';

const Header = () => {
    const [username, setUsername] = useState(null);

    const checkAuthStatus = () => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check for token expiration (exp is in seconds)
                if (decoded.exp && Date.now() >= decoded.exp * 1000) {
                    setUsername(null);
                } else {
                    setUsername(decoded.username || decoded.sub);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
                setUsername(null);
            }
        } else {
            setUsername(null);
        }
    };

    // Check auth status on component mount
    useEffect(() => {
        checkAuthStatus();
        
        // Listen for both storage changes and our custom authChange event
        const handleAuthChange = () => {
            checkAuthStatus();
        };

        window.addEventListener('storage', handleAuthChange);
        window.addEventListener('authChange', handleAuthChange);
        return () => {
            window.removeEventListener('storage', handleAuthChange);
            window.removeEventListener('authChange', handleAuthChange);
        };
    }, []);

    const history = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setUsername(null);
        window.dispatchEvent(new Event('authChange'));
        history('/');
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#add8e6', padding: '10px' }}>
            <Link className="navbar-brand" to="/">
                <img src="/vite.svg" style={{ height: '40px', marginRight: '15px' }} />
                DonorApp
            </Link>
            <div className="collapse navbar-collapse" style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {username && (
                        <span style={{ marginRight: '10px', fontWeight: 'bold' }}>
                            Welcome, {username}
                        </span>
                    )}
                    {username ? (
                        <button 
                            className="btn btn-outline-danger" 
                            onClick={handleLogout}
                            style={{ padding: '5px 10px' }}
                        >
                            Logout
                        </button>
                    ) : (
                        <Link className="btn btn-outline-primary" to="/login" style={{ padding: '5px 10px' }}>
                            Login
                        </Link>
                    )}
                    <ThreeLine />
                </div>
            </div>
        </nav>
    );
};

export default Header;
