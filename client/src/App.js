import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";
import Default from "./components/Default/Default";
import { isJsonString } from "./utils";
import * as userService from "./services/userService";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../src/redux/slides/userSlide";
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const { storageData, decode } = handleDecode();
    if (decode?.id) {
      handlegetDetailUser(decode?.id, storageData);
    }
  }, []);

  const handleDecode = () => {
    let storageData = localStorage.getItem("accessToken");
    let decode = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decode = jwtDecode(storageData);
    }
    return { decode, storageData };
  };

  userService.axiosJWT.interceptors.request.use(
    async function (config) {
      const currentTime = new Date();
      const { decode } = handleDecode();
      if (decode?.exp < currentTime.getTime() / 1000) {
        const data = await userService.refreshToken();
        config.headers["token"] = `Bearer ${data?.accessToken}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  const handlegetDetailUser = async (id, accessToken) => {
    const res = await userService.getDetailUser(id, accessToken);
    dispatch(updateUser({ ...res?.data, accessToken: accessToken }));
  };
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? Default : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}
