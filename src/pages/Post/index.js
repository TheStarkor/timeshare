import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import PostCard from '../../components/postCard/postCard';
import { AiOutlinePlus } from "react-icons/ai";
import './index.scss'

const Post = () => {
  // const [posts, setPosts] = useState(null);

  // useEffect(() => {
  //   axios.get('/posts')
  //     .then(res => {    
  //       setPosts(res.data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }, []);
  const posts = [
    {
      "type" : "타입",
      "title" : "삼성전자에 근무하고 있는 UX 디자이너입니다.",
      "class" : "산업디자인학과",
      "price" : "커피 한잔",
      "tag" :  ["삼성전자", "UX디자이너" ]
    },
    {
      "type" : "타입",
      "title" : "삼성전자에 근무하고 있는 UX 디자이너입니다.",
      "class" : "산업디자인학과",
      "price" : "커피 한잔",
      "tag" :  ["삼성전자", "UX디자이너" ]
    },
    {
      "type" : "타입",
      "title" : "삼성전자에 근무하고 있는 UX 디자이너입니다.",
      "class" : "산업디자인학과",
      "price" : "커피 한잔",
      "tag" :  ["삼성전자", "UX디자이너" ]
    } 
  ]
  
  return (
    <>
      <div className="post-container">
        <div>
          <div class="postList-title-container">
            <h2 className="postList-title">시간을 공유해요</h2>
            <div className="more">더보기</div>
          </div>          
          <div className="postList-container">          
            <Link to="/post/new">
              <div className="plusCard-container">
                <AiOutlinePlus size="40" color="#5A5A5A"/>
              </div>
            </Link>
            {posts 
            ?
            <>
              {posts.map(post => (
                <PostCard 
                  id={post?.id}
                  key={`posts-list-card-${post.id}`}
                  type={post?.type}
                  status={post?.status}
                  title={post?.title}
                  content={post?.content}
                  user={post?.User}
                />
              ))}
            </>
            : <></>}
          </div>
        </div>

        <div>
          <div class="postList-title-container">
            <h2 className="postList-title">시간을 공유받고 싶어요</h2>
            <div className="more">더보기</div>
          </div>          
          <div className="postList-container">          
            <Link to="/post/new">
              <div className="plusCard-container">
                <AiOutlinePlus size="40" color="#5A5A5A"/>
              </div>
            </Link>
            {posts 
            ?
            <>
              {posts.map(post => (
                <PostCard 
                  id={post?.id}
                  key={`posts-list-card-${post.id}`}
                  type={post?.type}
                  status={post?.status}
                  title={post?.title}
                  content={post?.content}
                  user={post?.User}
                />
              ))}
            </>
            : <></>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Post;