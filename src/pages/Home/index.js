import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import axios from 'axios';

import { GET_ME_REQUEST } from "../../reducers/user";
import LogoutButton from '../../components/LogoutButton';
import PostCard from '../../components/postCard/postCard';
import Landing from './landing';
import Post from '../Post';
import Header from '../../components/Header';

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
      <Header />
      {user.data
        ? <Post />
        : <Landing />}
    </>
  )
}

export default Home;