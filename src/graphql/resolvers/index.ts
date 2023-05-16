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
import {
  queryChildrenTags,
  queryTags,
} from "@/src/graphql/resolvers/query/tags";
import {
  queryJDictSearchWord,
  queryJishoSearchWord,
} from "@/src/graphql/resolvers/query/lib";
import { upsertTag } from "@/src/graphql/resolvers/mutation/upsertTag";

export default {
  Mutation: {
    addNewWord,
    upsertKanji,
    upsertKanjis,
    upsertTag,
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
  Tag: {
    children: queryChildrenTags,
  },
} as IResolvers;
