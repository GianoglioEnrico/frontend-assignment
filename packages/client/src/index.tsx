import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  //cache: new InMemoryCache(),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: relayStylePagination(["q"]),
          pokemonsByType: relayStylePagination(["type"]),
        },
      },
    },
  }),
  // cache: new InMemoryCache({
  //   typePolicies: {
  //     Query: {
  //       fields: {
  //         pokemonsByType: {
  //           // Don't cache separate results based on
  //           // any of this field's arguments.
  //           keyArgs: ["type", "limit", "after"],
  //           // Concatenate the incoming list items with
  //           // the existing list items.
  //           merge(existing = [], incoming) {
  //             return [...existing, ...incoming];
  //           },
  //         },
  //       },
  //     },
  //   },
  // }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
