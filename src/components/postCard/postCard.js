import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { postTypeParser, statusParser } from "../../utils/parser";



import './index.scss'

const PostCard = (props) => {
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

  const clickPost = (post) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'click_post',
      post_id: post.id,
      post_title: post.title
    })
  }

  const clickCard = () => {
    clickPost(props);

    navigate(`/post/${props?.id}`);
  };

  return (
    <>
      <div onClick={clickCard} className="postCard-container">
        {/* <div>타입: {`${postTypeParser(props?.type)}`}</div> */}
        <div>{`${props?.title}`}</div>
        <div className="tag-container">
          {isMobile ? <>
            {props?.tag
              ?
              <>
                {props.tag.map(item => (
                  <div className="tag-box">{`#${item}`}</div>
                ))}
              </>
              : <></>}
            <div className="tag-box">{`#${props?.class}`}</div>
            <div className="tag-price">{`#${props?.price}`}</div>
          </>
          :<>
            {props?.tag
              ?
              <>
                {props.tag.map(item => (
                  <div className="tag-box">{item}</div>
                ))}
              </>
              : <></>}
            <div className="tag-class">{`${props?.class}`}</div>
            <div className="tag-price">{`${props?.price}`}</div>
          </>
          }
          
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
