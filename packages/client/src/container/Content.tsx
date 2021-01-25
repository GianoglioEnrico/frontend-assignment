import React, { useState } from "react";

import { useQuery, useLazyQuery } from "@apollo/client";

import SearchInput from "../components/SearchInput";

import { Spin, Button } from "antd";

import SEARCH_POKEMON_NAME from "../graphql/queries/pokemonName";
import FILTER_POKEMON_TYPE from "../graphql/queries/pokemonType";
import GET_ALL_POKEMONS from "../graphql/queries/getAllPokemons";
import SelectType from "../components/SelectType";
import PokemonsTable from "../components/PokemonsTable";

import Title from "../components/Title";
import { PokemonInventoryData, PokemonVariables } from "../utils/types";

import { buttonSearch } from "../assets/style";

function Content() {
  const [pokemonName, setPokemonName] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [dataPokemonNameFlag, setDataPokemonNameFlag] = useState(false);
  const [showTable, setShowTable] = useState(true);
  let arrayOfTypes: string[] = [];
  const allPokemonsName: any[] = [];

  let dataSource: any[] = [];
  const [myValue, setMyValue] = useState<string | undefined>(
    "Select Pokemon Type"
  );

  const {
    loading: loadingAllPokemons,
    error: errorAllPokemons,
    data: allPokemons,
  } = useQuery<PokemonInventoryData, PokemonVariables>(GET_ALL_POKEMONS, {
    variables: { limit: 151 },
    onError: (error) => {
      setMyValue(error.networkError?.message);
    },
  });

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

  const [
    filterPokemonsByType,
    { loading: loadingFilteredPokemons, data: filteredPokemon, fetchMore },
  ] = useLazyQuery<PokemonInventoryData, PokemonVariables>(
    FILTER_POKEMON_TYPE,
    { onError: (error) => setError(error.networkError?.message) }
  );
  if (errorAllPokemons) {
  }
  allPokemons?.pokemons.edges.map((pokemon) => {
    allPokemonsName.push({ value: pokemon.node.name });
    return pokemon.node.types.map((pokemonType) => {
      arrayOfTypes = ["Select Pokemon Type"];
      return arrayOfTypes.push(pokemonType);
    });
  });
  let mySet: any = new Set(arrayOfTypes);
  arrayOfTypes = [...mySet];

  const handleSearchPokemon = () => {
    setDataPokemonNameFlag(true);
    setShowTable(true);
    !errorAllPokemons && setMyValue("Select Pokemon Type");
    setError("");

    searchPokemonByName({
      variables: {
        pokemonName,
        limit: 4,
      },
    });
  };

  const handleSelectedType = (event: string) => {
    if (event === "Select Pokemon Type") {
      setShowTable(false);
    } else {
      setShowTable(true);
    }
    setMyValue(event);
    setPokemonName("");
    setDataPokemonNameFlag(false);
    setType(event);
    setError("");
    // client.resetStore();
    filterPokemonsByType({
      variables: {
        type: event,
        limit: 1,
        after: filteredPokemon?.pokemonsByType.pageInfo.endCursor,
      },
    });
  };

  const handleLoadMore = () => {
    if (fetchAgain) {
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
      return fetchMore({
        query: FILTER_POKEMON_TYPE,
        variables: {
          type: type,
          limit: 2,
          after: filteredPokemon?.pokemonsByType.pageInfo.endCursor,
        },
      });
    }
  };

  dataPokemonName &&
    dataPokemonNameFlag &&
    dataPokemonName.pokemons.edges.map((pokemon) => {
      return dataSource.push(pokemon.node);
    });
  filteredPokemon &&
    !dataPokemonNameFlag &&
    filteredPokemon.pokemonsByType.edges.map((pokemon) => {
      return dataSource.push(pokemon.node);
    });

  return (
    <div>
      <Title />
      <SearchInput
        pokemonName={pokemonName}
        setPokemonName={setPokemonName}
        handleSearchPokemon={handleSearchPokemon}
        allPokemonsName={allPokemonsName}
      />
      <SelectType
        handleSelectedType={handleSelectedType}
        arrayOfTypes={arrayOfTypes}
        myValue={myValue}
        error={error}
      />

      {loadingPokemonName || loadingFilteredPokemons || loadingAllPokemons ? (
        <Spin size="large" className="spin" />
      ) : showTable ? (
        <PokemonsTable
          dataPokemonName={dataPokemonName}
          filteredPokemon={filteredPokemon}
          dataSource={dataSource}
          error={error}
          myValue={myValue}
        />
      ) : null}

      {(dataPokemonName?.pokemons.pageInfo.hasNextPage ||
        filteredPokemon?.pokemonsByType.pageInfo.hasNextPage) && (
        <Button
          onClick={handleLoadMore}
          style={buttonSearch}
          type="primary"
          shape="round"
          size="large"
          htmlType="submit"
        >
          Load More
        </Button>
      )}
    </div>
  );
}

export default Content;
