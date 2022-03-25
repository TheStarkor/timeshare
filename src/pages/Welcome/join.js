import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import { Form, Input, Button, Upload, Alert, Select } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import "./index.scss";

const { Option } = Select;



const Signup = () => {
  const [, setCookie] = useCookies(["Authorization"]);
  const [isError, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();
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

  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
    }
  };

  const onFinish = async (values) => {
    try {
      const {
        nickname,
        name,
        gender,
        studentId,
        dept,
        description,
        email,
        password,
        phoneNumber,
        image,
      } = values;
      const profileImageUrl = image?.file?.response?.uri;
      console.log(values);
      const res = await axios.post("/users/join", {
        nickname,
        name,
        gender,
        studentId,
        dept,
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
      window.location.href = "/end";
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
        <div className="signup-box">
          <div className="greeting-text1">
            회원가입
          </div>
          {isMobile ? <>
            <div className="greeting-text2">
            </div>
          </>
            : <>
              <div className="greeting-text2">
                프로필을 입력하고 업무, 채용, 커리어 이야기 등을 나눠보세요.
              </div>
            </>
          }
          <div className="signup-form-container">
            {isMobile ? <>
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
                      "https://api.onebob.co/uploads"
                    }
                    onChange={handleChange}
                  >
                    {imageUrl ? (
                      <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                    ) : (
                      <div>
                        <PlusOutlined style={{ color: "#00000050" }} />
                        {/* <div style={{ marginTop: 8 , color:'#ffffff'}}>Profile</div> */}
                      </div>
                    )}
                  </Upload>
                </Form.Item>

                {/* <Form.Item
                label="Nickname"
                name="nickname"
                rules={[{ required: true, message: "닉네임을 입력해주세요!" }]}
              >
                <Input />
              </Form.Item> */}

                <div className="form-container">
                  <div className="form-name">
                    <Form.Item
                      label="이름"
                      name="name"
                      rules={[{ required: true, message: "이름을 입력해주세요!" }]}
                    >
                      <Input
                        placeholder="이름 입력" />
                    </Form.Item>
                  </div>
                  <div className="form-gender">
                    <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "성별을 선택해주세요!" }]}>
                      <Select
                        placeholder="성별"
                        onChange={onGenderChange}
                        allowClear
                      >
                        <Option value="male">남성</Option>
                        <Option value="female">여성</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                <div className="form-container">
                  <div className="form-subject">
                    <Form.Item
                      label="학과"
                      name="dept"
                      rules={[{ required: true, message: "학번을 입력해주세요!" }]}
                    >
                      <Input placeholder="전산학부" />
                    </Form.Item>
                  </div>
                  <div className="form-studentnumber">
                    <Form.Item
                      label="학번"
                      name="studentId"
                      rules={[{ required: true, message: "학번을 입력해주세요!" }]}
                    >
                      <Input placeholder="12" />
                    </Form.Item>
                  </div>
                </div>

                <div className="divider"/>

                <div className="form-work">
                  <Form.Item
                    label="현재 소속 및 업무"
                    name="description"
                    rules={[{ required: true, message: "자기소개를 입력해주세요!" }]}
                  >
                    <Input placeholder="카이스트 대학원 신소재공학과" />
                  </Form.Item>
                </div>
                <div className="form-phone">
                  <Form.Item
                    label="전화번호"
                    name="phoneNumber"
                    rules={[{ required: true, message: "폰 번호를 입력해주세요!" }]}
                  >
                    <Input
                      placeholder="01012345678" />
                  </Form.Item>
                </div>
                <div className="form-email">
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "이메일을 입력해주세요!" }]}
                  >
                    <Input
                      placeholder="이메일" />
                  </Form.Item>
                </div>
                <div className="form-pw">
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
                  >
                    <Input.Password
                      placeholder="비밀번호 입력" />
                  </Form.Item>
                </div>



                {isError && <Alert message="닉네임이 중복됩니다." type="error" />}
                <div className="join-and-login">
                  {/* <Link to="/">
                  <div className="link-to-login">로그인</div>
                </Link> */}
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="join">
                      회원가입
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </>
              : <>
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
                        "https://api.onebob.co/uploads"
                      }
                      onChange={handleChange}
                    >
                      {imageUrl ? (
                        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                      ) : (
                        <div>
                          <PlusOutlined style={{ color: "#00000070" }} />
                          {/* <div style={{ marginTop: 8 , color:'#ffffff'}}>Profile</div> */}
                        </div>
                      )}
                    </Upload>
                  </Form.Item>

                  {/* <Form.Item
                label="Nickname"
                name="nickname"
                rules={[{ required: true, message: "닉네임을 입력해주세요!" }]}
              >
                <Input />
              </Form.Item> */}

                  <div className="form-container">
                    <div className="form-name">
                      <Form.Item
                        label="이름"
                        name="name"
                        rules={[{ required: true, message: "이름을 입력해주세요!" }]}
                      >
                        <Input
                          placeholder="이름 입력" />
                      </Form.Item>
                    </div>
                    <div className="form-studentnumber">
                      <Form.Item
                        label="학번"
                        name="studentId"
                        rules={[{ required: true, message: "학번을 입력해주세요!" }]}
                      >
                        <Input placeholder="12" />
                      </Form.Item>
                    </div>
                    <div className="form-subject">
                      <Form.Item
                        label="학과"
                        name="dept"
                        rules={[{ required: true, message: "학번을 입력해주세요!" }]}
                      >
                        <Input placeholder="전산학부" />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="form-container">
                    <div className="form-email">
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "이메일을 입력해주세요!" }]}
                      >
                        <Input
                          placeholder="이메일" />
                      </Form.Item>
                    </div>
                    <div className="form-gender">
                      <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "성별을 선택해주세요!" }]}>
                        <Select
                          placeholder="성별"
                          onChange={onGenderChange}
                          allowClear
                        >
                          <Option value="male">남성</Option>
                          <Option value="female">여성</Option>
                          <Option value="other">기타</Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </div>

                  <div className="form-container">
                    <div className="form-pw">
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "비밀번호를 입력해주세요!" }]}
                      >
                        <Input.Password
                          placeholder="비밀번호 입력" />
                      </Form.Item>
                    </div>

                    <div className="form-phone">
                      <Form.Item
                        label="phoneNumber"
                        name="phoneNumber"
                        rules={[{ required: true, message: "폰 번호를 입력해주세요!" }]}
                      >
                        <Input
                          placeholder="01012345678" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="form-container">
                    <div className="form-work">
                      <Form.Item
                        label="현재 소속 및 업무"
                        name="description"
                        rules={[{ required: true, message: "자기소개를 입력해주세요!" }]}
                      >
                        <Input.TextArea />
                      </Form.Item>
                    </div>
                  </div>


                  {isError && <Alert message="닉네임이 중복됩니다." type="error" />}
                  <div className="join-and-login">
                    {/* <Link to="/">
                  <div className="link-to-login">로그인</div>
                </Link> */}
                    <Form.Item>
                      <Button type="primary" htmlType="submit" className="join">
                        회원가입
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </>
            }

          </div>
        </div>

      </div>
    </>
  )
}

export default Signup;