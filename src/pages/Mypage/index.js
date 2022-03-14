import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button, Upload, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { GET_ME_REQUEST } from "../../reducers/user";
import { requestStatusParser } from "../../utils/parser";
import PostCard from "../../components/postCard/postCard";
import LogoutButton from "../../components/LogoutButton";

const Mypage = () => {
  const { user } = useSelector(state => state);
  const [isError, setError] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const { 
        nickname, 
        description,
        // image,
      } = values;
      // const profileImageUrl = image?.file?.response?.uri;
  
      await axios.put("/users", {
        nickname, 
        description,
        // profileImageUrl
      });


      dispatch({
        type: GET_ME_REQUEST,
      });
      window.location.href = "/me";
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      {user.data &&
      <div>
        <div>
          {/* 학과, 소속 추가 필요 */}
          <img src={user?.data.profileImageUrl} alt="avatar" style={{ width: "10%" }} />

          <div>{`학과 ${user?.data?.dept}`}</div> 
          {/* <div>{`현재 소속 ${null}`}</div> */}
          <div>{`자기소개 ${user?.data?.description}`}</div>
          <div>{`연락처 ${user?.data?.phoneNumber} / ${user?.data?.email}`}</div>
        </div>
        <div>
          <h1>보낸 요청</h1>
          {user.data.Requests.length !== 0
          ?
          user.data.Requests.map(request => (
            <>
              <div>{request.reason}</div>
              <div>{requestStatusParser(request.status)}</div>
            </>
          ))
          : <>요청이 없습니다.</>
          }
        </div>
        <div>
          <h1>들어온 요청</h1>
          {user.data.Requests.length !== 0
          ?
          user.data.Requests.map(request => (
            <>
              <div>{request.reason}</div>
              <div>{requestStatusParser(request.status)}</div>
            </>
          ))
          : <>요청이 없습니다.</>
          }
        </div>
        <div>
          <h1>게시글</h1>
          {user?.data?.Posts?.length !== 0
          ? 
          user?.data?.Posts.map(post => (
            <>
              <PostCard
                  id={post?.id}
                  key={`posts-list-card-${post?.id}`}
                  type={post?.type}
                  status={post?.status}
                  title={post?.title}
                  content={post?.content}
                  user={post?.User}
                  tag={post?.tag}
                  class={post?.class}
                  price={post?.price}
              />
            </>
          ))
          :
          <>작성한 게시글이 없습니다.</>}
        </div>
      </div>}
      로그아웃 <LogoutButton />
    </>
  )
}

export default Mypage;