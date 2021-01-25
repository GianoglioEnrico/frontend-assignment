import React from "react";
import { Select, Tooltip } from "antd";

import { InfoCircleOutlined } from "@ant-design/icons";
import { ISelectType } from "../utils/types";

const { Option } = Select;

// interface Props {
//   handleSelectedType: (event: string) => void;
//   arrayOfTypes: string[];
//   myValue: string;
//   error?: string;
// }

function SelectType({
  handleSelectedType,
  arrayOfTypes,
  myValue,
  error,
}: ISelectType) {
  const options = arrayOfTypes.map((myType, index) => (
    <Option key={index} value={myType}>
      {myType}
    </Option>
  ));
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Select
        showSearch
        value={myValue}
        bordered={true}
        style={{ width: 500 }}
        onChange={handleSelectedType}
        suffixIcon={
          <Tooltip title="Filter pokemons selecting type">
            <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
          </Tooltip>
        }
      >
        {options}
      </Select>
    </div>
  );
}

export default SelectType;
