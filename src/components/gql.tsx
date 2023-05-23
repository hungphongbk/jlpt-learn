import { graphql } from "@/src/graphql-client/gql";
import { gql } from "@apollo/client";

export const QUERY_ALL_TAGS = graphql(/* GraphQL */ `
  query AdminAllTags {
    tags {
      id
      label
      children {
        id
        label
      }
    }
  }
`);

export const GET_ALL_WORD = graphql(/*GraphQL*/ `
  query AdminGetAllWord($where: WordQueryInput) {
    words(where: $where) {
      id
      word
      pronounce
      explain {
        explain
      }
    }
  }
`);

export const SEARCH_WORD = graphql(/*GraphQL*/ `
  query AdminSearchWord($word: String!) {
    words(where: { word: { eq: $word } }) {
      id
      word
      pronounce
      explain {
        explain
      }
      tags {
        id
      }
      kanji {
        id
        hv
      }
    }
  }
`);

export const UPSERT_WORD = gql`
  mutation AddNewWord($word: WordInsertInput!) {
    addNewWord(word: $word) {
      id
    }
  }
`;
