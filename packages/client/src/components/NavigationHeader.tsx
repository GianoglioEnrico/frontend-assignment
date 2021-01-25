import React from "react";
import logo from "../assets/media/satispay-icon.jpg";
import { PageHeader } from "antd";

function NavHeader() {
  return (
    // <Header
    //   style={{
    //     backgroundColor: "white",
    //     border: "1px solid green",
    //     // marginBottom: "10px",
    //   }}
    // >
    <PageHeader
      className="site-page-header"
      title={
        <img
          src={logo}
          width={130}
          className="App-logo"
          data-testid="header-logo"
          alt="satispay-logo"
        />
      }
      extra={[
        <h3 className="header-title" key="1">
          Frontend-Assignment
        </h3>,
      ]}
    />
    // </Header>
  );
}

export default NavHeader;
