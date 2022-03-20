import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, message, Button } from "antd";

import { statusParser } from "../../utils/parser";
import "./show.scss";

const PostShow = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
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

  const onFinish = async (values) => {
    try {
      await axios.post(`/requests/${id}`, values);
      message.success("Submit success!");

      navigate("/post");
    } catch (error) {
      console.log(error);
      onFinishFailed();
    }
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  useEffect(() => {
    if (window.innerWidth <= 600) {
      setisMobile(true);
      console.log(isMobile);
    }

    window.addEventListener("resize", resizingHandler);
    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {post && (
        <div className="showForm-container">
          <div className="showForm-box">
            <div className="showForm-title">시간을 공유해요</div>

            <div className="showForm-top">
              <div className="title-and-detail">
                <div>
                  <div className="showForm-title-container">
                    <div className="showForm-title2">{`${post?.title}`}</div>
                    <div className="showForm-status">
                      {`${statusParser(post?.status)}`}
                    </div>
                  </div>
                  <div className="showForm-info">{`${post?.content}`}</div>
                </div>

                {isMobile ? (
                  <></>
                ) : (
                  <>
                    <div>
                      <div className="showForm-tag">
                        태그: {post.PostTags.map((item) => `#${item.name} `)}
                      </div>
                      <div className="showForm-price">{`${post?.price}`}</div>
                    </div>
                  </>
                )}
              </div>

              <div className="writer-info">
                <div>
                  <div className="info-title">작성자 정보</div>
                  {isMobile ? (
                    <>
                      <div className="info-body">
                        <div className="info-image-container">
                          <img className="info-image" src={post?.User?.profileImageUrl} alt="avatar" />
                        </div>
                        <div>
                          <div className="info-sentence">
                            <div className="info-text">{`${post?.User?.nickname}`}</div>
                            <div className="info-text">{`${post?.User?.gender}`}</div>
                          </div>
                          <div className="info-sentence">
                            <div className="info-title">학과</div>
                            <div className="info-text">{`${post?.User?.studentId}`}</div>
                          </div>
                          <div className="info-sentence">
                            <div className="info-title">소개</div>
                            <div className="info-text">{`${post?.User?.description}`}</div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="info-image-container">
                        <img className="info-image" src={post?.User?.profileImageUrl} alt="avatar" />
                        <div className="info-text">
                          {`${post?.User?.name}`}
                        </div>
                      </div>
                      <div className="info-title">성별</div>
                      <div className="info-text">{`${post?.User?.gender}`}</div>
                      <div className="info-title">학번</div>
                      <div className="info-text">{`${post?.User?.studentId}`}</div>
                      <div className="info-title">소개</div>
                      <div className="info-text">{`${post?.User?.description}`}</div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {isMobile ? (
              <>
                <div className="showForm-bottom">
                  <div className="showForm-bottom-title">태그</div>
                  {post.PostTags.map((item) => (<div className="showForm-tag">{`#${item.name}`}</div>))}
                  <div className="showForm-bottom-title">가격</div>
                  <div className="showForm-price">{`${post?.price}`}</div>

                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      name="reason"
                      rules={[
                        { required: true, message: "내용을 입력해 주세요!" },
                      ]}
                    >
                      <Input.TextArea placeholder="예) 소요 시간, 가능한 시간, 가능한 대략적인 위치는 꼭 명시해주세요." />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        제출하기
                      </Button>
                      {/* <Button type="secondary">Cancel</Button> */}
                    </Form.Item>
                  </Form>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* <div className="showForm-button">
            <Link to={`/post/${post?.id}/request`}>
              요청하기
            </Link>
          </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default PostShow;
