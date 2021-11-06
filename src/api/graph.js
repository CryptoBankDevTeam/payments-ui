import { ApolloClient, InMemoryCache } from '@apollo/client';

const APIURL = "http://127.0.0.1:8000/subgraphs/name/cryptobankdev/paymentgraph";

export const client = new ApolloClient({  
    uri: APIURL,  
    cache: new InMemoryCache()
});