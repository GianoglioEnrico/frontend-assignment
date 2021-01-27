import gql from "graphql-tag";

const SEARCH_POKEMON_NAME = gql`
  query GetPokemons($pokemonName: String, $limit: Int, $after: ID) {
    pokemons(q: $pokemonName, limit: $limit, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          name
          id
          types
          classification
        }
      }
    }
  }
`;

export default SEARCH_POKEMON_NAME;
