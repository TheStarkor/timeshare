import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      로그인을 해주세요

      <Link to="/login">
        <div className="login-link-to-join"> LOGIN </div>
      </Link>
    </>
  )
}

export default Landing;