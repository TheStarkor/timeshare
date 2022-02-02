import { useNavigate } from "react-router-dom";

import { postTypeParser, statusParser } from "../utils/parser";

const PostCard = (props) => {
  const navigate = useNavigate();

  const clickCard = () => {
    navigate(`/post/${props?.id}`);
  };

  return (
    <>
      <div onClick={clickCard} style={{ border: "1px solid red"}}>
        <div>타입: {`${postTypeParser(props?.type)}`}</div>
        <div>제목: {`${props?.title}`}</div>
        <div>소개: {`${props?.content}`}</div>
        <div>닉네임: {`${props?.user?.nickname}`}</div>
        <div>학번: {`${props?.user?.studentId}`}</div>
        <div>상태: {`${statusParser(props?.status)}`}</div>
      </div>
    </>
  );
};

export default PostCard;
