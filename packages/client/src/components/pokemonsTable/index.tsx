import React from "react";
import { Table, Alert } from "antd";
import { table, tableContainer } from "../../assets/style";
import { IPokemonTable } from "../../utils/types";

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

function PokemonsTable({
  dataPokemonName,
  filteredPokemon,
  dataSourceTable,
  error,
  currentTablePage,
  handlePage,
}: IPokemonTable) {
  return (
    <div style={tableContainer}>
      {error ? (
        <Alert message={error} style={{ marginTop: "10px" }} type="error" />
      ) : (
        (dataPokemonName || filteredPokemon) && (
          <Table
            id="table"
            dataSource={dataSourceTable}
            columns={columns}
            rowKey="id"
            pagination={{
              current: currentTablePage,
              pageSize: 2,
              position: ["bottomCenter"],
            }}
            style={table}
            onChange={handlePage}
            tableLayout="fixed"
          />
        )
      )}
    </div>
  );
}

export default PokemonsTable;
