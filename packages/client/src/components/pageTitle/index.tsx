import React from "react";
import { Typography } from "antd";
import { title, subtitle } from "../../assets/style";

const { Title, Text } = Typography;

function PageTitle() {
  return (
    <div>
      <Title style={title} data-testid="main-title">
        Welcome!
      </Title>
      <Text type="secondary" style={subtitle} data-testid="minor-title">
        In this page you have the possibility to search Pokemons by name or
        filtering them by type.
      </Text>
    </div>
  );
}
export default PageTitle;
