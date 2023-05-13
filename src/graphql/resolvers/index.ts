import addNewWord from "@/src/graphql/resolvers/mutation/addNewWord";
import { IResolvers } from "@graphql-tools/utils";
import {
  queryKanjiInWord,
  queryOneWord,
  queryWords,
} from "@/src/graphql/resolvers/query/words";
import { queryOneKanji } from "@/src/graphql/resolvers/query/kanji";
import {
  upsertKanji,
  upsertKanjis,
} from "@/src/graphql/resolvers/mutation/upsertKanji";
import { queryTags } from "@/src/graphql/resolvers/query/tags";
import {
  queryJDictSearchWord,
  queryJishoSearchWord,
} from "@/src/graphql/resolvers/query/lib";

export default {
  Mutation: {
    addNewWord,
    upsertKanji,
    upsertKanjis,
  },
  Query: {
    words: queryWords,
    word: queryOneWord,
    kanji: queryOneKanji,
    tags: queryTags,
    jishoSearchWord: queryJishoSearchWord,
    jdictSearchWord: queryJDictSearchWord,
  },
  Word: {
    kanji: queryKanjiInWord,
  },
} as IResolvers;
