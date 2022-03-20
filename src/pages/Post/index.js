import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

import "./index.scss";
import PostCard from "../../components/postCard/postCard";
import Header from "../../components/Header";

const Post = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [wantPosts, setWantPosts] = useState([]);
  const [sharePosts, setSharePosts] = useState([]);

  const resizingHandler = () => {
    if (window.innerWidth <= 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 600) {
      setIsMobile(true);
    }

    window.addEventListener("resize", resizingHandler);
    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  }, []);

  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        console.log(res.data);
        setWantPosts(res.data.wantPosts);
        setSharePosts(res.data.sharePosts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {isMobile && <Header />}
      <div className="post-container">
        <div>
          <div class="postList-title-container">
            <h2 className="postList-title">시간을 공유해요</h2>
            <div className="more">더보기</div>
          </div>
          <div className="postList-container">
            <Link to="/post/1/new">
              <div className="plusCard-container">
                <AiOutlinePlus size="40" color="#5A5A5A" />
              </div>
            </Link>
            {sharePosts ? (
              <>
                {sharePosts.map((post) => (
                  <PostCard
                    id={post?.id}
                    key={`sharePosts-list-card-${post?.id}`}
                    type={post?.type}
                    status={post?.status}
                    title={post?.title}
                    content={post?.content}
                    user={post?.User}
                    tag={post?.PostTags.map(item => item.name)}
                    class={post?.User?.dept}
                    price={post?.price}
                  />
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div>
          <div class="postList-title-container">
            <h2 className="postList-title">시간을 공유받고 싶어요</h2>
            <div className="more">더보기</div>
          </div>
          <div className="postList-container">
            <Link to="/post/2/new">
              <div className="plusCard-container">
                <AiOutlinePlus size="40" color="#5A5A5A" />
              </div>
            </Link>
            {wantPosts ? (
              <>
                {wantPosts.map((post) => (
                  <PostCard
                    id={post?.id}
                    key={`wantPosts-list-card-${post?.id}`}
                    type={post?.type}
                    status={post?.status}
                    title={post?.title}
                    content={post?.content}
                    user={post?.User}
                    tag={post?.PostTags.map(item => item.name)}
                    class={post?.User?.dept}
                    price={post?.price}
                  />
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
