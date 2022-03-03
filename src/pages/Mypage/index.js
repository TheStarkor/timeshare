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
        <div className="signup-form-container">
          <Form initialValues={{ remember: true }} onFinish={onFinish}>
            {/* <Form.Item
              name="image"
              rules={[
                { required: true, message: "프로필 사진을 추가해주세요!" },
              ]}
            >
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={
                  "http://ec2-13-125-111-9.ap-northeast-2.compute.amazonaws.com/uploads"
                }
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  <div>
                    <PlusOutlined style={{ color: "#ffffff70" }} />
                  </div>
                )}
              </Upload>
            </Form.Item> */}

            <Form.Item
              label="Nickname"
              name="nickname"
              initialValue={user?.data?.nickname}
              rules={[{ required: true, message: "닉네임을 입력해주세요!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="자기소개"
              name="description"
              initialValue={user?.data?.description}
              rules={[{ required: true, message: "자기소개를 입력해주세요!" }]}
            >
              <Input.TextArea />
            </Form.Item>
            {isError && <Alert message="닉네임이 중복됩니다." type="error" />}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                업데이트
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div>
          {/* 학과, 소속 추가 필요 */}
          <img src={user?.data.profileImageUrl} alt="avatar" style={{ width: "10%" }} />

          <div>{`학과 ${null}`}</div> 
          <div>{`현재 소속 ${null}`}</div>
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