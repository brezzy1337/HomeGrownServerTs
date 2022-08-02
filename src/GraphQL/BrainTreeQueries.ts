import { gql } from "@apollo/client";

export const NEW_GET_CLIENT_TOKEN = gql`
mutation GetToken($tokenInput: CreateClientTokenInput) {
  createClientToken(input: $tokenInput) {
    clientToken
  }
}`

export const VAULT_PAYMENT_MEHTOD = gql`
mutation VaultPaymentMethod ($input: VaultPaymentMethodInput!){
  vaultPaymentMethod (input: $input) {
    paymentMethod {
      customer {
				id
      		}
      id
      usage
      details {
        ... on PayPalAccountDetails {
          	email
          }
        }
      }
    }
  }
  
`