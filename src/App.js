import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import axios from "axios";
import { useCookies } from "react-cookie";

import "./index.css"
import "antd/dist/antd.css";
import FontAwesome from "./commons/FontAwesome";

import Router from "./router";
import store from "./store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [cookies] = useCookies(["Authorization"]);
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
      console.log(isMobile)
    }

    window.addEventListener("resize", resizingHandler);
    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  }, []);

  FontAwesome();

  // axios.defaults.baseURL =
  //   "http://ec2-13-125-111-9.ap-northeast-2.compute.amazonaws.com/";
  axios.defaults.baseURL = "http://localhost:8000";
  axios.interceptors.request.use((config) => {
    // TODO
    // if (process.env.REACT_APP_STAGE === 'dev') {
    //   config.baseURL = process.env.REACT_APP_DEV_BASE_URL
    // } else if (process.env.REACT_APP_STAGE === 'prod') {
    //   config.baseURL = process.env.REACT_APP_PROD_BASE_URL
    // }
    config = config || {};
    config.headers = config.headers || {};
    config.headers.Authorization = cookies.Authorization;

    return config;
  });

  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        {!isMobile && <Header />}
        <Router />
      </BrowserRouter>
      {/* <Footer /> */}
    </StoreProvider>
  );
}

export default App;
