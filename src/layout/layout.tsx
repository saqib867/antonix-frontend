import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Head from "./Head";

const Layout = () => {
  return (
    <div>
      <Head />
      <div className="mt-16">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
