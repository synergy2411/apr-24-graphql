import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4040/graphql",
});

const authLink = setContext((_, { headers }) => {
  let token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
// const client = new ApolloClient({
//   uri: "http://localhost:4040/graphql",
//   cache: new InMemoryCache(),
// });

export default client;
