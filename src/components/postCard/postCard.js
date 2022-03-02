import { useNavigate } from "react-router-dom";

import { postTypeParser, statusParser } from "../../utils/parser";



import './index.scss'

const PostCard = (props) => {
  const navigate = useNavigate();

  const clickCard = () => {
    navigate(`/post/${props?.id}`);
  };

  return (
    <>
      <div onClick={clickCard} className="postCard-container">
        {/* <div>타입: {`${postTypeParser(props?.type)}`}</div> */}
        <div>{`${props?.title}`}</div>
        <div className="tag-container">
          {props?.tag
            ?
            <>
              {props.tag.map(item => (
                <div>{item}</div>
              ))}
            </>
            : <></>}
          <div className="tag-box">{`${props?.class}`}</div>
          <div className="tag-box">{`${props?.class}`}</div>
          <div className="tag-box">{`${props?.class}`}</div>
          <div className="tag-class">{`${props?.class}`}</div>
          <div className="tag-price">{`${props?.price}`}</div>
        </div>
        {/* <div>소개: {`${props?.content}`}</div> */}
        {/* <div>닉네임: {`${props?.user?.nickname}`}</div>
        <div>학번: {`${props?.user?.studentId}`}</div>
        <div>상태: {`${statusParser(props?.status)}`}</div> */}
      </div>
    </>
  );
};

export default PostCard;
