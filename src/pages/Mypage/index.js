import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { Form, Input, Button, Upload, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { GET_ME_REQUEST } from "../../reducers/user";
import { requestStatusParser } from "../../utils/parser";

const Mypage = () => {
  const { user } = useSelector(state => state);
  const [isError, setError] = useState(false);
  const dispatch = useDispatch();

  console.log(user);

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

  // const handleChange = (info) => {
  //   if (info.file.response) {
  //     setImageUrl(info.file.response.uri);
  //   }
  // };

  console.log(user)


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
          보낸 요청
          {user.data.Requests.map(request => (
            <>
              <div>{request.reason}</div>
              <div>{requestStatusParser(request.status)}</div>
            </>
          ))}
        </div>
      </div>}
    </>
  )
}

export default Mypage;