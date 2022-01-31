import React, { Suspense, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

import Home from "../pages/Home";
import Mypage from "../pages/Mypage";

import Login from "../pages/Welcome/login";
import Join from "../pages/Welcome/join";

import Post from "../pages/Post";
import PostNew from "../pages/Post/new";
import PostRequest from "../pages/Post/request";

import Review from "../pages/Review";
import ReviewNew from "../pages/Review/new";

import { GET_ME_REQUEST } from "../reducers/user";

const Router = () => {
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();
  const [cookies] = useCookies(["Authorization"]);

  useEffect(() => {
    if (cookies.Authorization) {
      dispatch({
        type: GET_ME_REQUEST,
      });
    }
  }, [cookies, dispatch]);

  return(
    <Suspense>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/me" element={<Mypage />} />

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/join" element={<Join />} />

        <Route exact path="/post/:id" element={<Post />} />
        <Route exact path="/post/new" element={<PostNew />} />
        <Route exact path="/post/:id/request" element={<PostRequest />} />

        <Route exact path="/review/:id" element={<Review />} />
        <Route exact path="/review/new" element={<ReviewNew />} />

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Suspense>
  )
};

export default Router;