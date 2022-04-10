import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import {
  InstagramOutlined,
  MediumOutlined,
  MailOutlined
} from '@ant-design/icons';

import "./index.scss"

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <>
      {isMobile
        ? // mobile
        <>
          <div className='mobile-container'>
            <a href="https://www.instagram.com/one_bob_/" target="_blank">
              <InstagramOutlined />
            </a>
            <a href="https://onebob.oopy.io/" target="_blank">
              <MediumOutlined />
            </a>
            <a href="mailto:support@onebob.co" target="_blank">
              <MailOutlined />
            </a>
          </div>

        </>
        : // PC
        <>
          <div className='pc-container'>
            <a href="https://www.instagram.com/one_bob_/" target="_blank">
              <InstagramOutlined />
            </a>
            <a href="https://onebob.oopy.io/" target="_blank">
              <MediumOutlined />
            </a>
            <a href="mailto:support@onebob.co" target="_blank">
              <MailOutlined />
            </a>
          </div>
        </>
      }
    </>
  )
}

export default Footer