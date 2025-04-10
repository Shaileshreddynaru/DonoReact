import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostService from '../service/PostService';
import jwt_decode from 'jwt-decode';

const AddPost = (e) => {
    const [post_name, setTitle] = useState('');
    const [post_story, setContent] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                const decoded = jwt_decode(token);
                const username = decoded.username || decoded.sub;
                if (username) {
                    setTitle(username);
                    setUsername(username);
                }
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);
    
    const history=useNavigate();
    const handleSubmit =(e) => {
        e.preventDefault();
        const posts={post_name, post_story};

        PostService.readPost(posts).then((response) =>{
                 console.log(response.data)
                 history('/in')
                }).catch(error =>{
                 console.log(error)
                })
    
            }
    return (
        <div style={{ maxWidth: '500px', margin: 'auto' }}>
            <form onSubmit={handleSubmit} style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>
                {username && (
                    <div>
                        <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Username:</label>
                        <input
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                marginBottom: '15px', 
                                borderRadius: '4px', 
                                border: '1px solid #ccc',
                                backgroundColor: '#f0f0f0',
                                cursor: 'default'
                            }} 
                            type="text" 
                            value={username} 
                            readOnly
                        />
                    </div>
                )}
                <input 
                    type="hidden" 
                    value={post_name} 
                />
                <div>
                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Content:</label>
                    <textarea
                        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} 
                        value={post_story} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                    />
                </div>
              
                <button type="submit" onClick={handleSubmit} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}>Add Post</button>

            </form>
        </div>
    )
}

export default AddPost;
