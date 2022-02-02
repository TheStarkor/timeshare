import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import PostCard from '../../components/postCard';

const Post = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios.get('/posts')
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);
  
  return (
    <>
      <div>
        <Link to="/post/new">
          새로 만들기
        </Link>
      </div>
      {posts 
      ?
      <>
        {posts.map(post => (
          <PostCard 
            id={post?.id}
            key={`posts-list-card-${post.id}`}
            title={post?.title}
            content={post?.content}
            user={post?.User}
          />
        ))}
      </>
      : <></>}
    </>
  )
}

export default Post;