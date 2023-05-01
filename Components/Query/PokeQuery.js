import { gql } from "@apollo/client";


export const GET_POKEMON = gql
    `query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
          results {
            url
            name
            image
          }
        }
      }`;

export const GET_POKEMON_BY_NAME = gql
      `query pokemon($name: String!) {
        pokemon(name: $name) {
          id
          name
          sprites {
            front_default
          }
          moves {
            move {
              name
            }
          }
          types {
            type {
              name
            }
          }
        }
      }`;