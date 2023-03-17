import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { createApolloProvider } from "@vue/apollo-option";

const getHeaders = () => {
  let headers = {};
  const token = localStorage.getItem("token");
  if (token) {
    headers.authorization = "Bearer " + token;
  }
  return headers;
};

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
//   uri: "https://countries.trevorblades.com/",
  uri: "http://localhost:4000/graphql",
  headers: getHeaders(),
  fetch,
});

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
});
