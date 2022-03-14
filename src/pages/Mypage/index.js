import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button, Upload, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { GET_ME_REQUEST } from "../../reducers/user";
import { requestStatusParser } from "../../utils/parser";
import PostCard from "../../components/postCard/postCard";
import LogoutButton from "../../components/LogoutButton";

import './index.scss'

const Mypage = () => {
  const { user } = useSelector(state => state);
  const [isError, setError] = useState(false);
  const dispatch = useDispatch();
  const [isMobile, setisMobile] = useState(false);

  const resizingHandler = () => {
    if (window.innerWidth <= 600) {
      setisMobile(true);
    } else {
      setisMobile(false);
    }
  };
  // 우선 맨 처음 1023이하면 모바일 처리
  useEffect(() => {
    if (window.innerWidth <= 600) {
      setisMobile(true);
      console.log(isMobile)
    }

    window.addEventListener("resize", resizingHandler);
    return () => {
      // 메모리 누수를 줄이기 위한 removeEvent
      window.removeEventListener("resize", resizingHandler);
    };
  }, []);

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
      <div className="mypage-container">
        {isMobile ? <div className="mypage-header">마이페이지</div>
        :<></>
        }
        {user.data &&
          <div className="mypage-box">
            <div>
              <div class="mypage-title">MY PAGE</div>
              {/* 학과, 소속 추가 필요 */}
              <div className="mypage-profile-container">

                <img className="image" src={user?.data.profileImageUrl} alt="avatar" />

                <div>
                  <div className="mypage-profile-name">이름이름</div>
                  <div className="mypage-profile-sentence">
                    <div className="mypage-profile-bold">
                      <div>학과</div>
                      <div>자기소개</div>
                      <div>연락처</div>
                    </div>
                    <div className="mypage-profile-content">
                      <div>{` ${user?.data?.dept}`}</div>
                      {/* <div>{`현재 소속 ${null}`}</div> */}
                      <div>{`${user?.data?.description}`}</div>
                      <div>{`${user?.data?.phoneNumber} / ${user?.data?.email}`}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mypage-request-container">
              <div className="mypage-title">보낸 요청</div>
              {user.data.Requests.length !== 0
                ?
                user.data.Requests.map(request => (
                  <>
                    <div className="request-sentence">
                      <div className="request-bold">{request.reason}</div>
                      <div className="request-status">{requestStatusParser(request.status)}</div>
                    </div>
                  </>
                ))
                : <>요청이 없습니다.</>
              }
            </div>

            <div className="mypage-request-container">
              <div className="mypage-title">들어온 요청</div>
              {user.data.Requests.length !== 0
                ?
                user.data.Requests.map(request => (
                  <>
                    <div className="request-sentence">
                      <div>{request.reason}</div>
                      <div className="request-status">{requestStatusParser(request.status)}</div>
                    </div>
                  </>
                ))
                : <>요청이 없습니다.</>
              }
            </div>

            <div className="mypage-post-container">
              <div className="mypage-title">게시글</div>
              <div className="mypage-list-container"> 
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
            </div>
          </div>}
          {/* <LogoutButton>로그아웃 </LogoutButton> */}
      </div>
    </>
  )
}

export default Mypage;