import { createClient, cacheExchange, fetchExchange } from 'urql';

const SUBGRAPH_URL = process.env.NEXT_PUBLIC_SUBGRAPH_URL || '';

export const graphqlClient = createClient({
  url: SUBGRAPH_URL,
  exchanges: [cacheExchange, fetchExchange],
});
