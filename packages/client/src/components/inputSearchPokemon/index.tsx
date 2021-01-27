import React from "react";
import { Input, Button, Tooltip, Form, AutoComplete } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { form, inputSearch, buttonSearch } from "../../assets/style";
import { ISearchInput } from "../../utils/types";

function InputSearchPokemon({
  pokemonName,
  setPokemonName,
  handleSearchPokemon,
  allPokemonsName,
}: ISearchInput) {
  return (
    <div>
      <Form name="basic" onFinish={handleSearchPokemon} style={form}>
        <Form.Item>
          <AutoComplete
            options={allPokemonsName}
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onSelect={(e) => setPokemonName(e)}
            onChange={(e) => setPokemonName(e)}
            value={pokemonName}
          >
            <Input
              placeholder="Search Pokemon Name..."
              style={inputSearch}
              size="large"
              type="text"
              suffix={
                <Tooltip title="Search pokemons inserting their name">
                  <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                </Tooltip>
              }
            />
          </AutoComplete>
        </Form.Item>
        <Form.Item>
          <Button
            style={buttonSearch}
            disabled={!pokemonName ? true : false}
            type="primary"
            shape="round"
            size="large"
            htmlType="submit"
          >
            SEARCH
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default InputSearchPokemon;
