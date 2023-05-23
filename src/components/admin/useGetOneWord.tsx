import { useMutation, useQuery } from "@apollo/client";
import { useMemo } from "react";
import { graphql } from "@/src/graphql-client";
import { UPSERT_WORD } from "@/src/components/gql";

const GET_ONE_WORD = graphql(`
  query AdminGetOneWord($id: String!) {
    word(id: $id) {
      id
      word
      pronounce
      explain {
        explain
        preferredKana
      }
      kanji {
        id
        hv
      }
      tags {
        id
      }
    }
  }
`);

export default function useGetOneWord(id: string) {
  const { data } = useQuery(GET_ONE_WORD, { variables: { id } });
  const initialWord = useMemo(() => {
    if (!data?.word) {
      return { word: "", explain: [] };
    }
    const word = { ...data.word };
    word.tags = word.tags?.map((tag) => {
      return tag.id;
    }) as any;
    return word;
  }, [data]);

  const [mutate] = useMutation(UPSERT_WORD, {
    refetchQueries: [
      "AdminGetAllWord",
      { query: GET_ONE_WORD, variables: { id } },
    ],
  });

  return {
    initialWord,
    mutate,
  };
}
