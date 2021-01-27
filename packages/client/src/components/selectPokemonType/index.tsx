import React from "react";

// Style imports
import { Select, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

// Props Interface
import { ISelectType } from "../../utils/types";

const { Option } = Select;

function SelectPokemonType({
  handleSelectedType,
  arrayOfTypes,
  pokemonType,
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
        value={pokemonType}
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

export default SelectPokemonType;
