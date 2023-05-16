import { graphql } from "@/src/graphql-client/gql";

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
      explain
    }
  }
`);
