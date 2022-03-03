import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { GET_ME_REQUEST } from "../../reducers/user";
import LogoutButton from '../../components/LogoutButton';
import PostCard from '../../components/postCard/postCard';
import Landing from './landing';

const Home = () => {
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();
  const [cookies] = useCookies(["Authorization"]);

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    if (cookies.Authorization) {
      dispatch({
        type: GET_ME_REQUEST,
      });
    }
  }, [cookies, dispatch]);

  // 게시물 불러오기
  useEffect(() => {
    axios.get('/posts?count=6')
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  return (
    <>
      {user.data
        ? 
        <div>
          { user.data.nickname }님 안녕하세요
          <LogoutButton />
          <Link to="/me">
            Mypage
          </Link>
          <div>
            <Link to="/posts">More</Link>
            <br/>
            <Link to="/post/new">
              새로 만들기
            </Link>
            <div>시간을 공유해요</div>
            {posts && posts.map(post => (
              post.type === 1 &&
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
            <div>시간을 공유받고 싶어요</div>
            {posts && posts.map(post => (
              post.type === 2 &&
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
          </div>
        </div>
        : <Landing />}
    </>
  )
}

export default Home;