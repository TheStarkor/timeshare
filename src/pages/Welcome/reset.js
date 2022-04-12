import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import "./reset.scss"

import { Form, Input, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';

const Reset = () => {
  const [, setCookie] = useCookies(['Authorization']);
  const [isLogging, setLogging] = useState(false);
  const [isError, setError] = useState(false);

  const onFinish = async (values) => {
    const { email, password, studentId, name } = values;
    setLogging(true);
    try {
      const res = await axios.put('/users/reset_password', {
        email,
        password,
        studentId,
        name
      })
      setCookie('Authorization', res.data.token, { path: '/', maxAge: 24 * 60 * 60 });
      window.location.href = "/"
    } catch (error) {
      console.log(error);
      setLogging(false);
      setError(true);
    }

  }

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <div className="greeting-text1">
            비밀번호 변경
          </div>
          <div className="signup-form-container">
            <Form
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <div className="form-container">
                <div className="form-email">
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: '이메일을 입력해주세요!' }]}
                  >
                    <Input placeholder="이메일을 입력하세요" />
                  </Form.Item>
                </div>
              </div>
              <div className="form-container">
                <div className="form-email">
                  <Form.Item
                    label="이름"
                    name="name"
                    rules={[{ required: true, message: '이름을 입력해주세요!' }]}
                  >
                    <Input placeholder="이름을 입력하세요" />
                  </Form.Item>
                </div>
              </div>
              <div className="form-container">
                <div className="form-email">
                  <Form.Item
                    label="학번"
                    name="studentId"
                    rules={[{ required: true, message: '학번을 입력해주세요!' }]}
                  >
                    <Input placeholder="학번을 입력하세요. ex) 17" />
                  </Form.Item>
                </div>
              </div>
              <div className="form-container">
                <div className="login-form-pw">
                  <Form.Item
                    label="새 비밀번호"
                    name="password"
                    rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
                  >
                    <Input.Password placeholder="새 비밀번호를 입력하세요" />
                  </Form.Item>
                </div>
              </div>

              {isError && <Alert message="이메일 혹은 비밀번호가 올바르지 않습니다." type="error" />}
              <div className="button">
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isLogging}>
                    비밀번호 변경
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reset