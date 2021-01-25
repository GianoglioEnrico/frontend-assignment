import gql from "graphql-tag";

const GET_ALL_POKEMONS = gql`
  query GetAllPokemons($limit: Int) {
    pokemons(limit: $limit) {
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

export default GET_ALL_POKEMONS;
