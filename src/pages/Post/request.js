import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Form, Input, Button, message } from "antd";

const PostRequest = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(res => {
        setPost(res.data);
      })
      .catch(err => console.log(err));
  }, [])

  const onFinish = async (values) => {
    try {
      await axios.post(`/requests/${post?.id}`, values);
  
      message.success("Submit success!");

      navigate('/me')
    } catch (error) {
      console.log(error);
      onFinishFailed();
    }
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  return (
    <>
      <div style={{ border: "1px solid green" }}>
        게시물 정보
        <div>{post?.title}</div>
        <div>{post?.User.nickname}</div>
        <div>{post?.price}</div>
      </div>
      <div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="type">
            {post?.type === 1 ? '만남 요청' : '공유 제안'}
          </Form.Item>
          <Form.Item label={post?.type === 1 ? '원하는 내용을 작성해주세요' : '줄 수 있는 정보와 비용을 작성해주세요'} name="reason" rules={[{ required: true, message: '내용을 입력해 주세요!' }]}>
            <Input.TextArea placeholder="이유를 작성해주세요" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default PostRequest;