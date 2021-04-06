import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Favorites from "./component/Favorites";
import Weather from "./component/Weather";

import Layout from "./container/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact={true} path="/favorites" component={Favorites} />
        <Route exact={true} path="/" component={Weather} />
      </Layout>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default Router;
