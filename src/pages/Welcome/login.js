import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import { Form, Input, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';

const Login = () => {
  const [, setCookie] = useCookies(['Authorization']);
  const [isLogging, setLogging] = useState(false);
  const [isError, setError] = useState(false);

  const onFinish = async (values) => {
    const { email, password } = values;
    setLogging(true);
    try {
      const res = await axios.post('/users/login', {
        email,
        password,
      })

      console.log(res.data);
  
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
      <div className="login-header-container"> 
        <div className="login-signup-text"> SIGN IN </div> 
      </div>
      <div className="login-container">
        <div className="login-form-container">
          <Form
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: '이메일을 입력해주세요!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
            >
              <Input.Password />
            </Form.Item>
            {isError && <Alert message="이메일 혹은 비밀번호가 올바르지 않습니다." type="error" />}
            <div className="login-and-join">
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLogging}>
                  SIGN IN
                </Button>
              </Form.Item>
              <Link to="/join">
                <div className="login-link-to-join"> JOIN </div>
              </Link>
            </div>
          </Form>
        </div>

      </div>
    </>
  )
}

export default Login;