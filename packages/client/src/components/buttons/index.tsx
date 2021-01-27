import React from "react";

// Style imports
import { Button } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { buttonsContainer } from "../../assets/style";
// Props Interface
import { IButtons } from "../../utils/types";

function Buttons({
  showTable,
  dataPokemonName,
  filteredPokemon,
  handleLoadMore,
  dataPokemonNameFlag,
  handleResetTable,
  loadMoreBtnDisabled,
}: IButtons) {
  return (
    <div style={buttonsContainer}>
      {(dataPokemonName || filteredPokemon) && (
        <Button
          danger
          shape="round"
          size="large"
          htmlType="submit"
          onClick={handleResetTable}
        >
          <CloseOutlined />
          Close Table
        </Button>
      )}

      {showTable &&
        ((dataPokemonNameFlag &&
          dataPokemonName?.pokemons.pageInfo.hasNextPage) ||
          (!dataPokemonNameFlag &&
            filteredPokemon?.pokemonsByType.pageInfo.hasNextPage)) &&
        !loadMoreBtnDisabled && (
          <Button
            onClick={handleLoadMore}
            danger
            shape="round"
            size="large"
            htmlType="submit"
            style={{ borderColor: "green", color: "green" }}
          >
            <PlusOutlined />
            Load More
          </Button>
        )}
    </div>
  );
}

export default Buttons;
