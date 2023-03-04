import { Layout } from "antd";
import React from "react";
import Footer from "../Footer";
import Header from "../Header";

function MainLayout({ children }) {
  return (
    <Layout>
      <Header />
      <Layout>{children} <Footer /></Layout>
     
    </Layout>
  );
}

export default MainLayout;
