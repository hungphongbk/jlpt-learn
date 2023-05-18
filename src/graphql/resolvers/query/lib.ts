import { JDictWordResolvers, QueryResolvers, Word } from "@/types";
import { convertSnapshot } from "@/src/graphql/utils/convert";

export const queryJishoSearchWord: QueryResolvers["jishoSearchWord"] = async (
  _,
  { word },
  { jisho }
) => {
  return await jisho.searchForPhrase(word);
};

export const queryJDictSearchWord: QueryResolvers["jdictSearchWord"] = async (
  _,
  { word },
  { jdict }
) => {
  return {
    data: await jdict.search(word),
  };
};

export const JDictWord_queryIsExist: JDictWordResolvers["isExist"] = async (
  { word },
  _,
  { fsCollection }
) => {
  const result = await fsCollection("vocabulary")
    .where("word", "==", word)
    .limit(1)
    .get();
  if (result.empty) return null;

  return convertSnapshot(result.docs[0]) as unknown as Word;
};
