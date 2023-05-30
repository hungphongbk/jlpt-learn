import {
  GameScene,
  GameSceneResolvers,
  MixMatchScene,
  QueryResolvers,
  SceneType,
} from "@/types";
import { sample, sampleSize, shuffle } from "lodash";
import { prisma } from "@/src/db";

const sceneTypes = [SceneType.MixMatch];

const mixAndMatchTypes = [
  "kanji-kana",
  "kanji-meaning",
  "kana-meaning",
] as const;

export const __GameSceneResolverType: GameSceneResolvers["__resolveType"] = (
  obj
) => {
  if (obj.type === SceneType.MixMatch) return "MixMatchScene";
  return "WordToTextScene";
};

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

function getLeft(mixAndMatchType: ArrElement<typeof mixAndMatchTypes>, p: any) {
  if (mixAndMatchType === "kana-meaning") return p.pronounce;
  return p.explain[0].preferredKana ? p.pronounce : p.word;
}

function getRight(
  mixAndMatchType: ArrElement<typeof mixAndMatchTypes>,
  p: any
) {
  if (mixAndMatchType === "kanji-kana") return p.pronounce;
  return p.explain[0].explain;
}

export const queryGame: QueryResolvers["game"] = async (_, { input }) => {
  const scenes: GameScene[] = [];
  const words = await prisma.word.findMany({
    where: { tags: { some: { id: { equals: input.tags[0] } } } },
    include: { explain: { take: 1 } },
  });

  for (let i = 0; i < input.numberOfMatches; i++) {
    const type = sample(sceneTypes);

    if (type === SceneType.MixMatch) {
      const mixAndMatchType = sample(mixAndMatchTypes);

      const picked = sampleSize(words, 5);
      picked.forEach((p) => {
        const index = words.indexOf(p);
        if (index) words.splice(index, 1);
      });
      let picked2 = picked.map((p, index) => ({
        left: getLeft(mixAndMatchType!, p),
        right: getRight(mixAndMatchType!, p),
        index,
      }));
      const left = picked2.map((p) => p.left);
      picked2 = shuffle(picked2);
      const right = picked2.map((p) => p.right),
        comparison = picked2.map((p, index) => [p.index, index]);

      scenes.push({
        type,
        totalRows: 5,
        left,
        leftIsKanji: mixAndMatchType !== "kana-meaning",
        right,
        comparison,
      } as MixMatchScene);
    }
  }

  return { scenes };
};
