import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostService from '../service/PostService';

   
    const AddPost= (e) => {
        
    const [post_name, setTitle] = useState('');
    const [post_story, setContent] = useState('');
    
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
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: 'auto', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9' }}>

            <div>
                <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>Title:</label>

                <input
                    style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }} 

                    type="text" 
                    value={post_name} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
            </div>
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
    )
}

export default AddPost;
