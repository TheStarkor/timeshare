import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Form, Input, Button, Radio, message, InputNumber } from "antd";

const PostNew = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await axios.post('/posts', values);
  
      message.success("Submit success!");

      navigate('/post')
    } catch (error) {
      console.log(error);
      onFinishFailed();
    }
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="종류" name="type" rules={[{ required: true, message: '종류를 선택해 주세요!' }]}>
        <Radio.Group>
          <Radio.Button value={1}>공유하고 싶어요</Radio.Button>
          <Radio.Button value={2}>만나고 싶어요</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="제목" name="title" rules={[{ required: true, message: '제목을 입력해 주세요!' }]}>
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="내용" name="content" rules={[{ required: true, message: '내용을 입력해 주세요!' }]}>
        <Input.TextArea placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="금액" name="price" rules={[{ required: true, message: '금액을 입력해 주세요!' }]}>
      <InputNumber min={0} max={100000} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostNew;
