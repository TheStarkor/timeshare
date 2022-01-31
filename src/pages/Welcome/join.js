import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import { Form, Input, Button, Upload, Alert } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

const Signup = () => {
  const [, setCookie] = useCookies(["Authorization"]);
  const [isError, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onFinish = async (values) => {
    try {
      const { 
        nickname, 
        name, 
        gender, 
        studentId,
        description,
        email,
        password,
        phoneNumber,
        image,
      } = values;
      const profileImageUrl = image?.file?.response?.uri;
  
      const res = await axios.post("/users/join", {
        nickname, 
        name, 
        gender, 
        studentId,
        description,
        email,
        password,
        phoneNumber,
        profileImageUrl
      });

      console.log(res.data);

      setCookie("Authorization", res.data.token, {
        path: "/",
        maxAge: 24 * 60 * 60,
      });
      window.location.href = "/";
    } catch (error) {
      setError(true);
    }
  };

  const handleChange = (info) => {
    console.log(info);
    if (info.file.response) {
      setImageUrl(info.file.response.uri);
      console.log(info.file.response.uri);
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-greeting-text">
          <div className="greeting-text-first">
            안녕하세요! <br /> TnT 입니다.
          </div>
          <div className="greeting-text-second">
            서비스 이용을 위해 회원가입이 필요해요.
          </div>
          <div className="form-title">Profile Image</div>
        </div>

        <div className="signup-form-container">
          <Form initialValues={{ remember: true }} onFinish={onFinish}>
            <Form.Item
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
                    {/* <div style={{ marginTop: 8 , color:'#ffffff'}}>Profile</div> */}
                  </div>
                )}
              </Upload>
            </Form.Item>

            <Form.Item
              label="Nickname"
              name="nickname"
              rules={[{ required: true, message: "닉네임을 입력해주세요!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "이름을 입력해주세요!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "성별을 입력해주세요!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="StudnetId"
              name="studentId"
              rules={[{ required: true, message: "학번을 입력해주세요!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="자기소개"
              name="description"
              rules={[{ required: true, message: "자기소개를 입력해주세요!" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "이메일을 입력해주세요!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="phoneNumber"
              name="phoneNumber"
              rules={[{ required: true, message: "폰 번호를 입력해주세요!" }]}
            >
              <Input />
            </Form.Item>
            {isError && <Alert message="닉네임이 중복됩니다." type="error" />}
            <div className="join-and-login">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  회원가입
                </Button>
              </Form.Item>
              <Link to="/">
                <div className="link-to-login">로그인</div>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Signup;