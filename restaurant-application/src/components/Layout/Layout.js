import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Banner from "../../images/background.jpg";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ backgroundImage: `url(${Banner})`,backgroundSize: "cover",minHeight: "200vh",backgroundPosition: "center" }}>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
