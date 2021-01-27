import React from "react";
import logo from "../../assets/media/satispay-icon.jpg";
import { PageHeader } from "antd";

function NavigationHeader() {
  return (
    <PageHeader
      className="site-page-header"
      title={
        <img
          src={logo}
          width={130}
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
  );
}

export default NavigationHeader;
