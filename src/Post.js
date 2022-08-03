import React, { useState } from 'react';

export default function Post({post, deletePost}){
    const [showFull, setShowFull] = useState(false);
    const [deleted, setDeleted] = useState(false);

    if(deleted){
        return <></>;
    }

    if(showFull){
        return(<div className='post'>
            <div className='post_header'>
                <p>{post.title}</p>
                <button onClick={(e) => {
                    setShowFull(!showFull);
                }}>▲</button>
            </div>
            {post.text}
            <button onClick={()=>{
                deletePost(post.id);
                setDeleted(true);
            }}>Delete Post</button>
        </div>)
    }

    return (<div className='post'>
        <div className='post_header'>
            <p>{post.title}</p>
            <button onClick={(e) => {
                setShowFull(!showFull);
            }}>▼</button>
        </div>
    </div>)
}