import  {React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { Form, Input, Button, Radio, message, InputNumber } from "antd";
import './new.scss';

const PostNew = () => {
  const { type } = useParams(); 
  const [form] = Form.useForm();
  const navigate = useNavigate();
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
      await axios.post('/posts', {
        ...values,
        type: Number(type)
      });
  
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
        <div className="newForm-title">{type === '1' ? '시간을 공유해요' : '시간을 요청해요' }</div>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="newForm-top">
            <div className="title-and-detail">
              <Form.Item label="제목" name="title" rules={[{ required: true, message: '제목을 입력해 주세요!' }]}>
                <Input placeholder="본인 소개를 요약해서 적어주세요" />
              </Form.Item>
              <Form.Item label="내용" name="content" rules={[{ required: true, message: '내용을 입력해 주세요!' }]}>
                <Input.TextArea rows={8} placeholder={type === 1 ? "{예) 소요 시간, 가능한 시간, 가능한 대략적인 위치는 꼭 명시해주세요." : "예) 함께 나누고 싶은 이야기, 자기소개, 소요 시간, 궁금한 점 등" } />
              </Form.Item>
            </div>

            <div className="subject-and-tag">
              <Form.Item label="학과" name="subject" rules={[{ required: true, message: '학과를 입력해 주세요!' }]}>
                <Input placeholder="예) 공과대학 전산학부 석사 졸업" />
              </Form.Item>
              <Form.Item label="태그 편집" name="tags" rules={[{ required: true, message: '내용을 입력해 주세요!' }]}>
                <Input.TextArea rows={isMobile ? 3 : 8} placeholder="#태그 입력 (최대 5개)" />
              </Form.Item>
            </div>
          </div>
          <div className="newform-price">
            <Form.Item label="가격" name="price" rules={[{ required: true, message: '종류를 선택해 주세요!' }]}>
              <Radio.Group>
                <Radio.Button value={'커피 한 잔'}>커피 한 잔</Radio.Button>
                <Radio.Button value={'든든한 밥 한 끼'}>든든한 밥 한 끼</Radio.Button>
                <Radio.Button value={'간단한 샌드위치'}>간단한 샌드위치</Radio.Button>
                <Radio.Button value={'차 한 잔'}>차 한 잔</Radio.Button>
                <InputNumber min={0} max={100000} placeholder="직접입력"/>
              </Radio.Group>            
            </Form.Item>
          </div>
          <Form.Item>
            {isMobile? <>
              <div className="button-container">
                <Button type="primary" htmlType="submit">
                  제출하기
                </Button>
              </div>
            </>
            : <>
              <div className="button-container">
                <Button type="secondary" onClick={() => navigate('/')}>
                  Cancel
                </Button>     
                <Button type="primary" htmlType="submit">
                  제출하기
                </Button>
              </div>
            </>
            }            
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default PostNew;
