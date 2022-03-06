import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import { Form, Input, Button, Upload, Alert, Select } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

import "./end.scss";

const { Option } = Select;



const End = () => {

  return (
    <>
      <div className="end-container">
        <div className="end-box">
          <div className="end-text1">
            사전가입 완료 🙌
          </div>
          <div className="end-text2">
          선후배를 연결해주는 '밥한끼'의 서비스 런칭에 함께해주셔서 감사합니다.
          </div>

          <div className="end-text3">
          사전 가입자 분들에 한하여 베타 서비스 기간동안 다양한 선후배를 만나보세요!
          </div>
          
          <div className="end-text4">
          가입하신 연락처로 연락드리겠습니다.
          </div>
        </div>
      </div>
    </>
  )
}

export default End;