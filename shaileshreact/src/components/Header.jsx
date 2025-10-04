import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import ThreeLine from './threeLine';
import jwtDecode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

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
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#add8e6', padding: '10px 30px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div className="container-fluid" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Link className="navbar-brand" to="/" style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: 22, color: '#007bff', textDecoration: 'none' }}>
                        <img src="/vite.svg" style={{ height: '40px', marginRight: '15px' }} alt="logo" />
                        DonorApp
                    </Link>
                    <Link to="/" className="nav-link" style={{ fontWeight: 500, color: '#212529', fontSize: 18, textDecoration: 'none' }}>Home</Link>
                    {username && (
                        <Link to="/addpost" className="nav-link" style={{ fontWeight: 500, color: '#212529', fontSize: 18, textDecoration: 'none' }}>Add Post</Link>
                    )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {username && (
                        <>
                            <span style={{ marginRight: '10px', fontWeight: 'bold', color: '#007bff' }}>
                                Welcome, {username}
                            </span>
                            <Link to="/in" className="btn btn-warning" style={{ fontWeight: 600, color: '#212529', background: '#ffe066', border: 'none' }}>
                                <FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: 6 }} /> Upvoted
                            </Link>
                        </>
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
