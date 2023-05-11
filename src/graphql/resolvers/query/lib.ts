import { QueryResolvers } from "@/types";

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
