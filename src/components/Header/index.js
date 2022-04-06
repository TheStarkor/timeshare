import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./index.scss";

const Header = () => {
  const { user } = useSelector(state => state)

  const clickHome = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'click_home',
    })
  };

  const clickMyPage = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'click_mypage',
    })
  }

  return (
    <>
      <div className="header-container"> 
        <Link to="/" onClick={clickHome}>
          <div className="header-logo"> 
            밥한끼
          </div>
        </Link>

        {user?.data
          ? 
          <Link to="/me" onClick={clickMyPage}>
            {/* {user?.data?.name} */}
            <img className="header-profile-image" src={user?.data.profileImageUrl} alt="avatar" />
          </Link>
          : <></>
        }
        
      </div>
    </>
  )
}

export default Header