import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import { Form, Input, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';

import "./login.scss";

const Login = () => {
  const [, setCookie] = useCookies(['Authorization']);
  const [isLogging, setLogging] = useState(false);
  const [isError, setError] = useState(false);

  const onFinish = async (values) => {
    const { email, password } = values;
    setLogging(true);
    clickLogin();
    try {
      const res = await axios.post('/users/login', {
        email,
        password,
      })
      setCookie('Authorization', res.data.token, { path: '/', maxAge: 24 * 60 * 60 });
      window.location.href = "/"
    } catch (error) {
      console.log(error);
      setLogging(false);
      setError(true);
    }
  }

  const clickLogin = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'login'
    })
  }

  const clickMoveJoin = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'move_to_join'
    })
  }

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <div className="greeting-text1">
            로그인
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
                <div className="login-form-pw">
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
                  >
                    <Input.Password placeholder="비밀번호를 입력하세요" />
                  </Form.Item>
                </div>
              </div>

              {isError && <Alert message="이메일 혹은 비밀번호가 올바르지 않습니다." type="error" />}
              <div className="button">
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={isLogging} onClick={clickLogin}>
                    로그인
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
          <div className="forget-button">
            <Link to="/reset" className="text">
              <div> 비밀번호를 잊으셨나요? </div>
            </Link>
          </div>
          <div className="signup-button">
            <div>밥한끼가 처음이신가요?</div>
            <Link to="/join" className="text" onClick={clickMoveJoin}>
              <div> 회원가입 </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;