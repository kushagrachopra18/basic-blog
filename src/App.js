import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Post from './Post'

function App(){
const userName = "kchopra";
const [userPosts, setUserPosts] = useState([]);
const [userPostsLoaded, setUserPostsLoaded] = useState(false);

const [postTitle, setPostTitle] = useState('');
const [postText, setPostText] = useState('');

const loadPosts = async () => {
  try {
      const res = await axios.get(`https://us-central1-mbtcandidate.cloudfunctions.net/posts/${userName}`);
      setUserPosts(res.data.response);
      setUserPostsLoaded(true);
  } catch (error) {
      // setErrorMessage('Please email support@mydinnerpal.com, something is wrong on our end :)');
      console.log(error);
  }
}

const deletePost = async (id) => {
  try {
      const res = await axios.delete(`https://us-central1-mbtcandidate.cloudfunctions.net/posts/${userName}/${id}`);
      console.log(`Deleted post with id ${id}`);
    } catch (error) {
      console.log(error);
  }
}

useEffect(() => {
  loadPosts();
}, []);

  return (
    <>
      <h1>{userName}'s Blog</h1>

      <form className='new-post-form' onSubmit={async (event) => {
                    event.preventDefault();
                    // setProcessing(true);
                    try {
                        const res = await axios.post(`https://us-central1-mbtcandidate.cloudfunctions.net/posts/${userName}`,{'text':postText, 'title':postTitle});
                        console.log(res.data.response);
                    } catch (error) {
                        // setErrorMessage('Please email support@example.com, something is wrong on our end :)');
                        console.log(error);
                    }
                    // setProcessing(false);
                }}>
                    <label>
                        Title
                        <input 
                            type="text"
                            value={postTitle}
                            // disabled={processing}
                            onChange={(e)=> {setPostTitle(e.target.value)}}
                        />
                    </label>
                    <label>
                        Text
                        <textarea 
                            type="text"
                            value={postText}
                            // disabled={processing}
                            onChange={(e)=> {setPostText(e.target.value)}}
                        />
                    </label>
                    <button>Create Post</button>
                    {/* <p className="error_message">{errorMessage}</p> */}
                </form>
      {/* <Posts
        posts={userPosts}
        postsLoaded={userPostsLoaded}
      /> */}
      <h2> My Posts</h2>
      {userPosts.length>0 && userPosts.map((post) => {return <Post post={post} deletePost={deletePost} key={post.id}/>})}
    </>
  );
}

export default App;
