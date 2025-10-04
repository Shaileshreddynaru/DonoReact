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
        <div style={{ width: '100%', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <h2>Top Liked Posts</h2>
            {posts.sort((a, b) => b.post_likes - a.post_likes).map(post => (
                <div key={post.post_id} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    margin: '16px 0',
                    padding: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    backgroundColor: '#fff',
                    width: '500px',
                    minHeight: '160px',
                    gap: '18px',
                    position: 'relative',
                }}>
                    {/* Dummy image, like Reddit post thumbnail */}
                    <img src={`https://source.unsplash.com/random/80x80?sig=${post.post_id}`} alt="Post" style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover', flexShrink: 0, border: '1px solid #eee' }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ marginBottom: 8 }}>
                            <h3 style={{ margin: 0, fontSize: 20, color: '#222', fontWeight: 600 }}>{post.post_name}</h3>
                            <p style={{ margin: '8px 0 0 0', color: '#444', fontSize: 15 }}>{post.post_story}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
                            <button onClick={() => handleLike(post.post_id)} disabled={post.liked} style={{ backgroundColor: post.liked ? '#28a745' : '#007bff', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '5px', fontWeight: 500, fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
                                <FontAwesomeIcon icon={faThumbsUp} /> Upvote
                            </button>
                            <span style={{ color: '#888', fontWeight: 500, fontSize: 15 }}>Upvotes: {post.post_likes}</span>
                            <button onClick={goToDonorList} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '5px', fontWeight: 500, fontSize: 15 }}>Donate</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TopLikedPosts;
