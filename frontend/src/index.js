import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";

const client = new ApolloClient({
  uri: "http://localhost:4040/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
