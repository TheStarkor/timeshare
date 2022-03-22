import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "../../reducers/user";
import { MdLogout } from "react-icons/md";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const [, , removeCookie] = useCookies(["Authorization"]);

  const Logout = () => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });

    removeCookie("Authorization");
    window.location.href = "/";
  };

  return (
    <>
      <div onClick={Logout} style={{color:"#777777", cursor:"pointer", marginTop:"80px"}}>로그아웃</div>
    </>
  );
};

export default LogoutButton;
