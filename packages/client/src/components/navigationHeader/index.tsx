import React from "react";
import { PageHeader } from "antd";
// Satispay logo
import logo from "../../assets/media/satispay-icon.jpg";

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
