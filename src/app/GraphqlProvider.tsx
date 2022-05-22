import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import * as ReactDOM from 'react-dom';
import config from '../config';
import ConnectionLost from './components/ui/ConnectionLost';

const uri = config.API_URL;
const httpLink = createHttpLink({
  uri: uri,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(config.STORE_ACCESS_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path, extensions: { code } }) =>
      // eslint-disable-next-line no-console
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Code: ${code}`),
    );

  if (networkError) {
    // eslint-disable-next-line no-console
    console.log(`[Network error]: ${networkError}`);
    ReactDOM.render(<ConnectionLost />, document.getElementById('root'));
  }
});

export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

const GraphqlProvider = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphqlProvider;
