import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Form, Input, Button, Radio, message, InputNumber } from "antd";
import './new.scss';

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
    <div className="newForm-container">
      <div className="newForm-box">
        <div className="newForm-title">시간을 공유해요</div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {/* <Form.Item label="종류" name="type" rules={[{ required: true, message: '종류를 선택해 주세요!' }]}>
            <Radio.Group>
              <Radio.Button value={1}>공유하고 싶어요</Radio.Button>
              <Radio.Button value={2}>만나고 싶어요</Radio.Button>
            </Radio.Group>
          </Form.Item> */}
          <div className="newForm-top">
            <div className="title-and-detail">
              <Form.Item label="제목" name="title" rules={[{ required: true, message: '제목을 입력해 주세요!' }]}>
                <Input placeholder="본인 소개를 요약해서 적어주세요" />
              </Form.Item>
              <Form.Item label="내용" name="content" rules={[{ required: true, message: '내용을 입력해 주세요!' }]}>
                <Input.TextArea placeholder="예) 소요 시간, 가능한 시간, 가능한 대략적인 위치는 꼭 명시해주세요." />
              </Form.Item>
            </div>
            <div className="subject-and-tag">
            <Form.Item label="학과" name="subject" rules={[{ required: true, message: '학과를 입력해 주세요!' }]}>
              <Input placeholder="예) 공과대학 전산학부 석사 졸업" />
            </Form.Item>
            <Form.Item label="태그 편집" name="tags" rules={[{ required: true, message: '내용을 입력해 주세요!' }]}>
              <Input.TextArea placeholder="#태그 입력 (최대 5개)" />
            </Form.Item>
            </div>
          </div>
          <Form.Item label="가격" name="type" rules={[{ required: true, message: '종류를 선택해 주세요!' }]}>
            <Radio.Group>
              <Radio.Button value={1}>커피 한잔</Radio.Button>
              <Radio.Button value={2}>든든한 밥 한끼</Radio.Button>
              <Radio.Button value={3}>간단한 샌드위치</Radio.Button>
              <Radio.Button value={4}>차 한잔</Radio.Button>
              <InputNumber min={0} max={100000} placeholder="직접입력"/>
            </Radio.Group>            
          </Form.Item>
          {/* <Form.Item label="" name="price" rules={[{ required: true, message: '금액을 입력해 주세요!' }]}>
            <InputNumber min={0} max={100000} />
          </Form.Item> */}
          <Form.Item>
            <div className="button-container">
              <Button type="secondary">
                Cancel
              </Button>     
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PostNew;
