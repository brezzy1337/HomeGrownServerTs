import { GraphQLClient } from 'graphql-request';
import config from '@src/config/config';

const endpoint = "https://payments.sandbox.braintree-api.com/graphql";

export const BraintreeGQLClient = new GraphQLClient(endpoint, 
    {
        headers: {
            "Content-Type": "application/json",
            // Encoded Token should be called from server which is encoded in a jwt format for double the encrytion ;)
            Authorization: config.braintree.Token,
            "Braintree-Version": "2021-05-11",
    }
});