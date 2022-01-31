import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import axios from "axios";
import { useCookies } from "react-cookie";

import "antd/dist/antd.css";

import Router from "./router";
import store from "./store";

function App() {
  const [cookies] = useCookies(["Authorization"]);

  // axios.defaults.baseURL =
  //   "http://ec2-13-125-111-9.ap-northeast-2.compute.amazonaws.com";
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
        <Router />
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
