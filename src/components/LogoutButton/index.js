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
      <MdLogout size="24px" onClick={Logout} />
    </>
  );
};

export default LogoutButton;
