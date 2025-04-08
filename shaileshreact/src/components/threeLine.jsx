import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ThreeLine = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);
    const goTo = (path) => {
        navigate(path);
        setShowMenu(false);
    };

    return (
        <div style={{ 
            position: 'relative',
            display: 'inline-block'
        }}>
            <FontAwesomeIcon 
                icon={faEllipsisVertical} 
                size="lg"
                onClick={toggleMenu}
                style={{ 
                    color: '#333',
                    cursor: 'pointer',
                    padding: '8px'
                }}
            />
            
            {showMenu && (
                <div style={{
                    position: 'absolute',
                    right: 0,
                    backgroundColor: 'white',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    borderRadius: '4px',
                    zIndex: 1000,
                    minWidth: '150px'
                }}>
                    <div 
                        style={{
                            padding: '10px 15px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #eee'
                        }}
                        onClick={() => goTo('/')}
                    >
                        Home
                    </div>
                    <div 
                        style={{
                            padding: '10px 15px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #eee'
                        }}
                        onClick={() => goTo('/in')}
                    >
                        Upvoted
                    </div>
                    <div 
                        style={{
                            padding: '10px 15px',
                            cursor: 'pointer'
                        }}
                        onClick={() => goTo('/top-liked')}
                    >
                        Top Liked Posts
                    </div>
                </div>
            )}
        </div>
    );
};

export default ThreeLine;
