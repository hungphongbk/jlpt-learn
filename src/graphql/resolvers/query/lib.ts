import {
  JDictKanjiResolvers,
  JDictWordResolvers,
  QueryResolvers,
} from "@/types";
import { prisma } from "@/src/db";

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

export const JDictWord_queryIsExist: JDictWordResolvers["isExist"] = ({
  word,
}) => {
  return prisma.word.findUnique({
    where: { word },
    include: { explain: true },
  }) as any;
};

export const JDictKanji_queryIsExist: JDictKanjiResolvers["isExist"] = ({
  kanji,
}) => {
  return prisma.kanji.findUnique({ where: { id: kanji } });
};
