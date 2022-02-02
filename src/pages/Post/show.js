import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { postTypeParser, statusParser } from '../../utils/parser';

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
      <div>제목: {`${post?.title}`}</div>
      <div>타입: {`${postTypeParser(post?.type)}`}</div>
      <div>
        상태(대기중/진행중/완료): {`${statusParser(post?.status)}`}
      </div>
      <div>Post ID {`${id}`}</div>
      <div style={{border: "1px solid blue"}}>
        User 정보
        <div>Nickname {`${post?.User?.nickname}`}</div>
        <div>성별 {`${post?.User?.gender}`}</div>
        <div>학번 {`${post?.User?.studentId}`}</div>
        <div>소개 {`${post?.User?.description}`}</div>
      </div>
      <div>
        가격: {`${post?.price}`}
      </div>
      <div>
        내용: {`${post?.content}`}
      </div>
      <Link to={`/post/${post?.id}/request`}>
        요청하기
      </Link>
    </>
  )
}

export default PostShow;