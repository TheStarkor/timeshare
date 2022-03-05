import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./index.scss";

const Header = () => {
  const { user } = useSelector(state => state)
  return (
    <>
      <div className="header-container"> 
        <Link to="/">
          <div className="header-logo"> 
            밥한끼
          </div>
        </Link>

        {/* {user?.data
          ? 
          <Link to="/me">
            {user?.data?.name}
          </Link>
          :
          <Link to="/login">
            <div className="header-login"> LOGIN </div>
          </Link>
        } */}
        
      </div>
    </>
  )
}

export default Header