import React from "react";
import { Table, Alert } from "antd";
import { table } from "../assets/style";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Classification",
    dataIndex: "classification",
    key: "classification",
  },
  {
    title: "Type",
    dataIndex: "types",
    key: "types",
    render: (types: any[]) => (
      <>
        {types.map((type) => (
          <p key={type}>{type}</p>
        ))}
      </>
    ),
  },
];

interface DataSource {
  id: string;
  name: string;
  types: string[];
  classification: string;
}

interface Pokemon {
  node: {
    id: string;
    name: string;
    types: string[];
    classification: string;
  };
}
interface PageInfo {
  hasNextPage: boolean;
}

interface PokemonInventory {
  edges: Pokemon[];
  pageInfo: PageInfo;
}

interface PokemonInventoryData {
  pokemons: PokemonInventory;
  pokemonsByType: PokemonInventory;
}

interface Props {
  dataPokemonName?: PokemonInventoryData;
  filteredPokemon?: PokemonInventoryData;
  dataSource: DataSource[];
  error?: string;
  myValue?: string;
}

function PokemonsTable({
  dataPokemonName,
  filteredPokemon,
  dataSource,
  error,
}: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <Alert message={error} style={{ marginTop: "10px" }} type="error" />
      ) : (
        (dataPokemonName || filteredPokemon) && (
          <Table
            dataSource={dataSource}
            columns={columns}
            rowKey="id"
            pagination={false}
            style={table}
            scroll={{ y: 240 }}
          />
        )
      )}
    </div>
  );
}

export default PokemonsTable;
