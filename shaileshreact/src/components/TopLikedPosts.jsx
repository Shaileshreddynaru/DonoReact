import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import PostService from '../service/PostService';

const TopLikedPosts = () => {
    const [posts, setPosts] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const history = useNavigate();

    const goToDonorList = () => {
        history('/donorList');
    };

    const handleLike = (id) => {
        const hasUpvoted = sessionStorage.getItem(`upvoted_${id}`);
        if (hasUpvoted) return;

        sessionStorage.setItem(`upvoted_${id}`, 'true');

        const updatedPosts = posts.map(post => {
            if (post.post_id === id && !post.liked) {
                return { ...post, post_likes: post.post_likes + 1, liked: true };
            }
            return post;
        });

        setPosts(updatedPosts);
        
        const updatedPost = { ...updatedPosts.find(post => post.post_id === id) };
        PostService.readPost(updatedPost).then(response => {
            console.log('Post updated successfully:', response.data);
        }).catch(error => {
            console.log('Error updating post:', error);
        });
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        
        PostService.getPost().then((response) => {
            setPosts(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{ display: 'flex', height: '80vh' }}>
            {/* Left Navigation Sidebar */}
            <div style={{
                width: isMobile ? '60px' : '200px',
                backgroundColor: '#f8f9fa',
                padding: isMobile ? '10px' : '20px',
                borderRight: '1px solid #dee2e6',
                transition: 'all 0.3s ease'
            }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Link to="/" style={{
                        padding: '10px',
                        borderRadius: '5px',
                        backgroundColor: '#e9ecef',
                        textDecoration: 'none',
                        color: '#212529',
                        textAlign: isMobile ? 'center' : 'left'
                    }}>
                        {isMobile ? '🏠' : 'Home'}
                    </Link>
                    <Link to="/in" style={{
                        padding: '10px',
                        borderRadius: '5px',
                        backgroundColor: '#e9ecef',
                        textDecoration: 'none',
                        color: '#212529',
                        textAlign: isMobile ? 'center' : 'left'
                    }}>
                        {isMobile ? '👍' : 'Upvoted'}
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ 
                flex: 1,
                overflowY: 'scroll',
                padding: isMobile ? '10px' : '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h2>Top Liked Posts</h2>
            
                {posts.sort((a, b) => b.post_likes - a.post_likes).map(post => (
                    <div key={post.post_id} style={{ 
                        border: '1px solid #ccc', 
                        borderRadius: '8px', 
                        margin: '10px', 
                        padding: '15px', 
                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', 
                        backgroundColor: '#fff', 
                        width: '300px', 
                        height: '300px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'space-between' 
                    }}>
                        <h3>{post.post_name}</h3>
                        <p>{post.post_story}</p>
                        <p>Upvotes: {post.post_likes}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                            <button onClick={() => handleLike(post.post_id)} disabled={post.liked} style={{ backgroundColor: post.liked ? '#28a745' : '#007bff', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>
                                <FontAwesomeIcon icon={faThumbsUp} /> Upvote
                            </button>
                            <button onClick={goToDonorList} style={{ marginBottom: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>Donate</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopLikedPosts;
