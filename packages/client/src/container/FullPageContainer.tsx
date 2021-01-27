import React, { useState } from "react";

// Apollo Client
import { useQuery, useLazyQuery } from "@apollo/client";
import { useApolloClient } from "@apollo/client";

// Apollo Queries Import
import SEARCH_POKEMON_NAME from "../graphql/queries/pokemonName";
import FILTER_POKEMON_TYPE from "../graphql/queries/pokemonType";
import GET_ALL_POKEMONS from "../graphql/queries/getAllPokemons";

// Style
import { Spin } from "antd";

// Interfaces
import { PokemonInventoryData, PokemonVariables } from "../utils/types";

// React Component
import PageTitle from "../components/pageTitle";
import InputSearchPokemon from "../components/inputSearchPokemon";
import Buttons from "../components/buttons";
import SelectPokemonType from "../components/selectPokemonType";
import PokemonsTable from "../components/pokemonsTable";

function FullPageContainer() {
  // Variables declaration
  const [pokemonName, setPokemonName] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [dataPokemonNameFlag, setDataPokemonNameFlag] = useState(false);
  const [showTable, setShowTable] = useState(true);
  let arrayOfTypes: string[] = [];
  const allPokemonsName: any[] = [];
  const client = useApolloClient();
  let dataSourceTable: any[] = [];
  const [pokemonType, setPokemonType] = useState<string | undefined>(
    "Select Pokemon Type"
  );
  const [loadMoreBtnDisabled, setLoadMoreBtnDisabled] = useState(false);
  const [currentTablePage, setCurrentTablePage] = useState(1);

  // Get All Pokemons
  const {
    loading: loadingAllPokemons,
    error: errorAllPokemons,
    data: allPokemons,
  } = useQuery<PokemonInventoryData, PokemonVariables>(GET_ALL_POKEMONS, {
    variables: { limit: 151 },
    onError: (error) => {
      setPokemonType(error.networkError?.message);
    },
  });

  // Fetch Pokemons By Name
  const [
    searchPokemonByName,
    {
      loading: loadingPokemonName,
      data: dataPokemonName,
      fetchMore: fetchAgain,
    },
  ] = useLazyQuery<PokemonInventoryData, PokemonVariables>(
    SEARCH_POKEMON_NAME,
    { onError: (error) => setError(error.networkError?.message) }
  );

  // Fetch Pokemons By Type
  const [
    filterPokemonsByType,
    { loading: loadingFilteredPokemons, data: filteredPokemon, fetchMore },
  ] = useLazyQuery<PokemonInventoryData, PokemonVariables>(
    FILTER_POKEMON_TYPE,
    { onError: (error) => setError(error.networkError?.message) }
  );

  // Create two Arrays when the page loads: one with all pokemons names and the other with all the Pokemons' types
  if (allPokemons) {
    arrayOfTypes = ["Select Pokemon Type"];
    allPokemons?.pokemons.edges.map((pokemon) => {
      allPokemonsName.push({ value: pokemon.node.name });
      return pokemon.node.types.map((pokemonType) => {
        return arrayOfTypes.push(pokemonType);
      });
    });
    let mySet: any = new Set(arrayOfTypes);
    arrayOfTypes = [...mySet];
  }

  // Event for searching Pokemons names
  const handleSearchPokemon = () => {
    client.clearStore();
    setLoadMoreBtnDisabled(false);
    setCurrentTablePage(1);
    setDataPokemonNameFlag(true);
    setShowTable(true);
    !errorAllPokemons && setPokemonType("Select Pokemon Type");
    setError("");
    searchPokemonByName({
      variables: {
        pokemonName,
        limit: 2,
      },
    });
  };

  // Event for selecting Pokemons types
  const handleSelectedType = (event: string) => {
    client.clearStore();
    setLoadMoreBtnDisabled(false);
    setCurrentTablePage(1);
    event === "Select Pokemon Type" ? setShowTable(false) : setShowTable(true);
    setPokemonType(event);
    setPokemonName("");
    setDataPokemonNameFlag(false);
    setType(event);
    setError("");
    filterPokemonsByType({
      variables: {
        type: event,
        limit: 2,
        after: filteredPokemon?.pokemonsByType.pageInfo.endCursor,
      },
    });
  };

  // Event for loading more Pokemons from the table
  const handleLoadMore = () => {
    if (dataPokemonNameFlag && fetchAgain) {
      setCurrentTablePage(currentTablePage + 1);
      return fetchAgain({
        query: SEARCH_POKEMON_NAME,
        variables: {
          pokemonName: pokemonName,
          limit: 2,
          after: dataPokemonName?.pokemons.pageInfo.endCursor,
        },
      });
    }
    if (fetchMore) {
      setCurrentTablePage(currentTablePage + 1);
      return fetchMore({
        query: FILTER_POKEMON_TYPE,
        variables: {
          type: type,
          limit: 2,
          after: filteredPokemon?.pokemonsByType.pageInfo.endCursor,
        },
      });
    }
    setCurrentTablePage(currentTablePage + 1);
  };

  // Clear Pokemons table
  const handleResetTable = () => {
    client.clearStore();
    dataSourceTable = [];
    setShowTable(false);
    setPokemonName("");
    setPokemonType("Select Pokemon Type");
  };

  // Array gets populated by all Pokemons searched by name
  dataPokemonName &&
    dataPokemonNameFlag &&
    dataPokemonName.pokemons.edges.map((pokemon) => {
      return dataSourceTable.push(pokemon.node);
    });

  // Array gets populated by all Pokemons searched by type
  filteredPokemon &&
    !dataPokemonNameFlag &&
    filteredPokemon.pokemonsByType.edges.map((pokemon) => {
      return dataSourceTable.push(pokemon.node);
    });

  // Handling Pokemons table pagination
  const handlePage = (page: any) => {
    if (page.current !== dataSourceTable.length / 2) {
      setLoadMoreBtnDisabled(true);
    } else {
      setLoadMoreBtnDisabled(false);
    }
    setCurrentTablePage(page.current);
  };

  return (
    <div>
      <PageTitle />
      <InputSearchPokemon
        pokemonName={pokemonName}
        setPokemonName={setPokemonName}
        handleSearchPokemon={handleSearchPokemon}
        allPokemonsName={allPokemonsName}
      />
      <SelectPokemonType
        handleSelectedType={handleSelectedType}
        arrayOfTypes={arrayOfTypes}
        pokemonType={pokemonType}
      />

      {loadingPokemonName || loadingFilteredPokemons || loadingAllPokemons ? (
        <Spin size="large" className="spin" />
      ) : showTable ? (
        <>
          <PokemonsTable
            dataPokemonName={dataPokemonName}
            filteredPokemon={filteredPokemon}
            dataSourceTable={dataSourceTable}
            error={error}
            currentTablePage={currentTablePage}
            setCurrentTablePage={setCurrentTablePage}
            setLoadMoreBtnDisabled={setLoadMoreBtnDisabled}
            handlePage={handlePage}
          />
          <Buttons
            loadMoreBtnDisabled={loadMoreBtnDisabled}
            showTable={showTable}
            dataPokemonName={dataPokemonName}
            filteredPokemon={filteredPokemon}
            handleLoadMore={handleLoadMore}
            dataPokemonNameFlag={dataPokemonNameFlag}
            handleResetTable={handleResetTable}
          />
        </>
      ) : null}
    </div>
  );
}

export default FullPageContainer;
