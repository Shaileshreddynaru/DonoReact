import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faCommentAlt, faShare, faGift } from '@fortawesome/free-solid-svg-icons';
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
        <div style={{ width: '100%', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', background: '#e3f0fb' }}>
            <h2 style={{ fontWeight: 700, color: '#007bff', marginBottom: 24, letterSpacing: 1 }}>Top Liked Posts</h2>
            {posts.sort((a, b) => b.post_likes - a.post_likes).map(post => (
                <div key={post.post_id} style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'stretch',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    margin: '16px 0',
                    backgroundColor: '#fff',
                    width: '600px',
                    minHeight: '140px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    overflow: 'hidden',
                    fontFamily: 'Segoe UI, Arial, sans-serif',
                }}>
                    {/* Upvote/Downvote bar */}
                    <div style={{ background: '#e3f0fb', width: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '12px 0', gap: 8 }}>
                        <button onClick={() => handleLike(post.post_id)} disabled={post.liked} style={{ background: 'none', border: 'none', cursor: post.liked ? 'not-allowed' : 'pointer', color: post.liked ? '#007bff' : '#878a8c', fontSize: 22, marginBottom: 2 }}>
                            <FontAwesomeIcon icon={faArrowUp} />
                        </button>
                        <span style={{ fontWeight: 700, color: '#222', fontSize: 18 }}>{post.post_likes}</span>
                        <button disabled style={{ background: 'none', border: 'none', color: '#878a8c', fontSize: 22, marginTop: 2, cursor: 'not-allowed' }}>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </button>
                    </div>
                    {/* Post content */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: '16px', gap: 18 }}>
                        {/* Thumbnail */}
                        <img src={`https://source.unsplash.com/random/80x80?sig=${post.post_id}`} alt="Post" style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover', flexShrink: 0, border: '1px solid #eee', marginRight: 12 }} />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            {/* Meta info */}
                            <div style={{ marginBottom: 4, fontSize: 13, color: '#878a8c' }}>
                                Posted by <span style={{ color: '#007bff', fontWeight: 500 }}>u/DonorUser</span> • just now
                            </div>
                            {/* Title and story */}
                            <h3 style={{ margin: 0, fontSize: 20, color: '#222', fontWeight: 600 }}>{post.post_name}</h3>
                            <p style={{ margin: '8px 0 0 0', color: '#444', fontSize: 15 }}>{post.post_story}</p>
                            {/* Action bar */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 12 }}>
                                <button style={{ background: 'none', border: 'none', color: '#878a8c', fontWeight: 500, fontSize: 15, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faCommentAlt} /> 0 Comments
                                </button>
                                <button style={{ background: 'none', border: 'none', color: '#878a8c', fontWeight: 500, fontSize: 15, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faShare} /> Share
                                </button>
                                <button onClick={goToDonorList} style={{ background: '#007bff', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: '5px', fontWeight: 500, fontSize: 15, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <FontAwesomeIcon icon={faGift} /> Donate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TopLikedPosts;
