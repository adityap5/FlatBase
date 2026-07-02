import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GRAPHQL_URL } from '../config/api';
import { getToken } from '../utils/auth';

// HTTP connection to GraphQL server — URL from centralised config
const httpLink = createHttpLink({ uri: GRAPHQL_URL });

// Middleware to attach JWT from auth utility
const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
