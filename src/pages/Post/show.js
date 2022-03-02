import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { postTypeParser, statusParser } from '../../utils/parser';
import './show.scss';

const PostShow = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(res => {
        setPost(res.data);
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <>
      <div className="showForm-container">
        <div className="showForm-box">
          <div className="showForm-title">시간을 공유해요</div>
          
          <div className="showForm-top">
            <div className="title-and-detail">
              <div>
                <div className="showForm-title-container">
                  <div className="showForm-title2">제목:{`${post?.title}`}</div>
                  {/* <div>타입: {`${postTypeParser(post?.type)}`}</div> */}
                  <div className="showForm-status">
                    {`${statusParser(post?.status)}`}
                  </div>
                </div>
                <div className="showForm-info">
                  {`${post?.content}`}
                </div>  
              </div>
              <div>
                <div className="showForm-tag">
                  태그: {`${post?.content}`}
                </div>
                <div className="showForm-price">
                  {`${post?.price}`}
                </div>
              </div>
            </div>
            <div className="writer-info">
              <div>
                <div className="info-title">작성자 정보</div>
                <div className="info-image-container">
                  <div className="info-image"/>
                  <div className="info-text">Nickname {`${post?.User?.nickname}`}</div>
                </div>
                <div className="info-title">성별</div>
                <div className="info-text">{`${post?.User?.gender}`}</div>
                <div className="info-title">학번</div>
                <div className="info-text">{`${post?.User?.studentId}`}</div>
                <div className="info-title">소개</div>
                <div className="info-text">{`${post?.User?.description}`}</div>
              </div>
            </div>
          </div>

          {/* <div>Post ID {`${id}`}</div> */}
          
          
          <div className="showForm-button">
            <Link to={`/post/${post?.id}/request`}>
              요청하기
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostShow;