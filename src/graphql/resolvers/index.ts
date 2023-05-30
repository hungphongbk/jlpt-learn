import addNewWord, {
  setOppositeWord,
} from "@/src/graphql/resolvers/mutation/addNewWord";
import { IResolvers } from "@graphql-tools/utils";
import { queryOneWord, queryWords } from "@/src/graphql/resolvers/query/words";
import { queryOneKanji } from "@/src/graphql/resolvers/query/kanji";
import {
  upsertKanji,
  upsertKanjis,
} from "@/src/graphql/resolvers/mutation/upsertKanji";
import { queryTags } from "@/src/graphql/resolvers/query/tags";
import {
  JDictKanji_queryIsExist,
  JDictWord_queryIsExist,
  queryJDictSearchWord,
  queryJishoSearchWord,
} from "@/src/graphql/resolvers/query/lib";
import { upsertTag } from "@/src/graphql/resolvers/mutation/upsertTag";
import { JSONObjectResolver, JSONResolver } from "graphql-scalars";
import {
  __GameSceneResolverType,
  queryGame,
} from "@/src/graphql/resolvers/query/game";

export default {
  JSON: JSONResolver,
  JSONObject: JSONObjectResolver,
  Mutation: {
    addNewWord,
    upsertKanji,
    upsertKanjis,
    upsertTag,
    setOppositeWord,
  },
  Query: {
    words: queryWords,
    word: queryOneWord,
    kanji: queryOneKanji,
    tags: queryTags,
    jishoSearchWord: queryJishoSearchWord,
    jdictSearchWord: queryJDictSearchWord,
    //game
    game: queryGame,
  },
  JDictWord: {
    isExist: JDictWord_queryIsExist,
  },
  JDictKanji: {
    isExist: JDictKanji_queryIsExist,
  },
  GameScene: {
    __resolveType: __GameSceneResolverType,
  },
} as IResolvers;
