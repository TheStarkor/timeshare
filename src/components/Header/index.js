import { Link } from 'react-router-dom';
import "./index.scss";

const Header = () => {
  return (
    <>
      <div className="header-container"> 
        <div className="header-logo"> 
          밥한끼
        </div>

        {/* <Link to="/login"> */}
          <div className="header-login"> LOGIN </div>
        {/* </Link> */}
      </div>
    </>
  )
}

export default Header