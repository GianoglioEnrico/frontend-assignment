import { PaginationConfig } from "antd/lib/pagination";
import { TablePaginationConfig } from "antd/lib/table";

export interface Pokemon {
  node: {
    id: string;
    name: string;
    types: string[];
    classification: string;
  };
}
export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface PokemonInventory {
  edges: Pokemon[];
  pageInfo: PageInfo;
}

export interface PokemonInventoryData {
  pokemons: PokemonInventory;
  pokemonsByType: PokemonInventory;
}

export interface PokemonVariables {
  limit?: number;
  pokemonName?: string;
  type?: string;
  after?: string;
}

export interface ISelectType {
  handleSelectedType: (event: string) => void;
  arrayOfTypes: string[];
  pokemonType?: string;
  error?: string;
}

interface DataSource {
  id: string;
  name: string;
  types: string[];
  classification: string;
}

export interface TablePage {
  current: number;
  pageSize: number;
}

export interface IPokemonTable {
  dataPokemonName?: PokemonInventoryData;
  filteredPokemon?: PokemonInventoryData;
  dataSourceTable: DataSource[];
  error?: string;
  currentTablePage: number;
  setCurrentTablePage: (arg0: number) => void;
  setLoadMoreBtnDisabled: (arg0: boolean) => void;
  handlePage: (arg0: TablePaginationConfig) => void;
}

export interface IButtons {
  showTable: boolean;
  dataPokemonName?: PokemonInventoryData;
  filteredPokemon?: PokemonInventoryData;
  handleLoadMore: () => void;
  dataPokemonNameFlag: boolean;
  handleResetTable: () => void;
  loadMoreBtnDisabled: boolean;
}
export interface ISearchInput {
  pokemonName: string;
  setPokemonName: Function;
  handleSearchPokemon: () => void;
  allPokemonsName: any[];
}
