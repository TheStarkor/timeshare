import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'

import "./index.scss";

const Landing = () => {
  const [isMobile, setisMobile] = useState(false);

  const resizingHandler = () => {
    if (window.innerWidth <= 1000) {
      setisMobile(true);
    } else {
      setisMobile(false);
    }
  };

  // 우선 맨 처음 1023이하면 모바일 처리
  useEffect(() => {
    if (window.innerWidth <= 1000) {
      setisMobile(true);
      console.log(isMobile)
    }

    window.addEventListener("resize", resizingHandler);
    return () => {
      // 메모리 누수를 줄이기 위한 removeEvent
      window.removeEventListener("resize", resizingHandler);
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="landing0">
          <div className="inner_container">
            <div className="landing0_text1">
              선배님,<br />
              <span className="highlight">밥 한끼 </span>
              하실래요?
              <img className="landing0_image" src="https://tmi-image.s3.ap-northeast-2.amazonaws.com/profile/1644694766874%E1%84%87%E1%85%A1%E1%86%B8.png" />
            </div>
            <div className="landing0_text2">
              직접 만나 대화를 하고 싶은 선배와 밥 한끼 함께 해요!
            </div>
          </div>
        </div>

        <div className="landing1">
          <div className="inner_container">
            <div className="landing1_text">
              <div>코로나로 인해 선배들의 조언은 얻기 힘들고 </div>
              <div>학번 차이가 많이 나는 선배들은 연락하기 부담스러웠던 적이 있으신가요?</div>
            </div>
            {isMobile
              ? <img className="landing1_image" height='180' src='https://tmi-image.s3.ap-northeast-2.amazonaws.com/profile/1644927762932%E1%84%85%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A9%E1%84%87%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF2%20%E1%84%92%E1%85%AA%E1%84%8C%E1%85%B5%E1%86%AF%E1%84%8B%E1%85%A5%E1%86%B8.png' />
              : <img className="landing1_image" src='https://tmi-image.s3.ap-northeast-2.amazonaws.com/profile/1644694175726%E1%84%85%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B5%E1%86%BC1-2.png' />
            }
          </div>
        </div>

        <div className="landing2">
          <div className="inner_container">
            <div className="landing2_text">
              {isMobile
                ? <div>
                  부담없이 커피 한잔, 밥 한끼를 함께 하며 <br />
                  선배들의 조언을 얻고 생각을 공유해요. <br />
                  어쩌면 굉장한 기회가 생길 수도 있어요! <br />
                </div>
                : <>
                  <div>부담없이 커피 한잔, 밥 한끼를 함께 하며</div>
                  <div>선배들의 조언을 얻고 생각을 공유해요. 어쩌면 굉장한 기회가 생길 수도 있어요!</div>
                </>
              }

            </div>
            {isMobile
              ? <img className="landing2_image" src='https://tmi-image.s3.ap-northeast-2.amazonaws.com/profile/1644928174161%E1%84%85%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B5%E1%86%BC%20%E1%84%86%E1%85%A9%E1%84%87%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF%203.png' />
              : <img className="landing2_image" src='https://tmi-image.s3.ap-northeast-2.amazonaws.com/profile/1644692461098%E1%84%85%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B5%E1%86%BC2.png' />}

          </div>
        </div>

        <div className="landing3">
          {isMobile
            ? <>
              <div className="landing3_text_container">
                <div className="landing3_text1">그래서, ‘밥한끼’가 뭔가요?</div>
                <div className="landing3_image_container">
                  <img className="landing3_image" src='https://tmi-image.s3.ap-northeast-2.amazonaws.com/profile/1644693190285%E1%84%85%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B5%E1%86%BC3.png' />
                </div>
                <div>재학 중이거나 졸업한 선후배를</div>
                <div>연결해주는 소셜링 서비스에요. </div>
                <div className="landing3_text2">
                  후배들은 선배들의 시간을 요청하거나<br />
                  자신이 원하는 선배의 시간을 구매할 수 있어요.<br />
                  밥한끼는 후배와 선배를 연결해드려요.<br />
                  간단한 티타임, 밥 시간을 이용해 선배들을 만나보세요!<br />
                </div>
              </div>
            </>
            : <>
              <div className="landing3_text_container">
                <div className="landing3_text1">그래서, ‘밥한끼’가 뭔가요?</div>
                <div>재학 중이거나 졸업한 선후배를</div>
                <div>연결해주는 소셜링 서비스에요. </div>
                <div className="landing3_text2">
                  후배들은 선배들의 시간을 요청하거나<br />
                  자신이 원하는 선배의 시간을 구매할 수 있어요.<br />
                  밥한끼는 후배와 선배를 연결해드려요.<br />
                  간단한 티타임, 밥 시간을 이용해 선배들을 만나보세요!<br />
                </div>
              </div>
              <img className="landing3_image" src='https://tmi-image.s3.ap-northeast-2.amazonaws.com/profile/1644693190285%E1%84%85%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B5%E1%86%BC3.png' />

            </>
          }
        </div>

        <div className="landing4">
          {isMobile
            ? <>
              <div className="landing4_text_container">
                <div className="landing4_text1">어떻게 시작하나요?</div>
                <div className="landing4_image_container">
                  <img className="landing4_image" src='https://tmi-image.s3.ap-northeast-2.amazonaws.com/profile/1644693423115%E1%84%85%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B5%E1%86%BC4.png' />
                </div>                  
                <div>회원가입 이후에 선배를 찾고</div>
                <div>티타임을 요청하면 끝</div>
                <div className="landing4_text2">
                  학번 차이 때문에 선배들에게 연락하기가 부담스러우신가요?<br />
                  코로나 때문에 선배들을 알 기회가 많이 없으신가요?<br />
                  밥한끼에서 선배들을 찾고 만남을 요청해보세요!<br />
                </div>
              </div>
            </>
            : <>
              <div className="landing4_text_container">
                <div className="landing4_text1">어떻게 시작하나요?</div>
                <div>회원가입 이후에 선배를 찾고</div>
                <div>티타임을 요청하면 끝</div>
                <div className="landing4_text2">
                  학번 차이 때문에 선배들에게 연락하기가 부담스러우신가요?<br />
                  코로나 때문에 선배들을 알 기회가 많이 없으신가요?<br />
                  밥한끼에서 선배들을 찾고 만남을 요청해보세요!<br />
                  간단한 티타임, 밥 시간을 이용해 선배들을 만나보세요!<br />
                </div>
              </div>
              <img className="landing4_image" src='https://tmi-image.s3.ap-northeast-2.amazonaws.com/profile/1644693423115%E1%84%85%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B5%E1%86%BC4.png' />
            </>
          }
        </div>
      </div>

    </>
  )
}

export default Landing;