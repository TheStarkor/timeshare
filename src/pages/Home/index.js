import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';

import { GET_ME_REQUEST } from "../../reducers/user";
import LogoutButton from '../../components/LogoutButton';

const Home = () => {
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();
  const [cookies] = useCookies(["Authorization"]);

  useEffect(() => {
    if (cookies.Authorization) {
      dispatch({
        type: GET_ME_REQUEST,
      });
    }
  }, [cookies, dispatch]);

  return (
    <>
      {user.data
        ? 
        <div>
          { user.data.nickname }님 안녕하세요
          <LogoutButton />
          <Link to="/me">
            Mypage
          </Link>
        </div>
        : 
        <div>
          로그인을 해주세요

          <Link to="/login">
            <div className="login-link-to-join"> LOGIN </div>
          </Link>
        </div>}
    </>
  )
}

export default Home;