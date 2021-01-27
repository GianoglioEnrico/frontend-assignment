import gql from "graphql-tag";
const FILTER_POKEMON_TYPE = gql`
  query FilterPokemonsByType($type: String!, $limit: Int, $after: ID) {
    pokemonsByType(type: $type, limit: $limit, after: $after) {
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

export default FILTER_POKEMON_TYPE;
