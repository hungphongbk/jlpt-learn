import { createSchema, createYoga, YogaInitialContext } from "graphql-yoga"; // @ts-ignore
import mainTypeDefs from "./schema.graphql"; // @ts-ignore
import typeDefs$1 from "./word-kanji-tag.graphql"; // @ts-ignore
import typeDefs$2 from "./lib.graphql";

import resolvers from "./resolvers";
import { initializeAdmin } from "@/src/firebase-admin/firestore";
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";
import { mergeTypeDefs } from "@graphql-tools/merge";
import JishoAPI from "@/lib/jisho-dict";
import JDictAPI from "@/lib/jdict";
import { useResponseCache } from "@graphql-yoga/plugin-response-cache";
import { createRedisCache } from "./utils/redis-kv";

const cache = createRedisCache({});

export interface GraphQLContext extends YogaInitialContext {
  firestore: admin.firestore.Firestore;
  jisho: JishoAPI;
  jdict: typeof JDictAPI;
}

const typeDefs = mergeTypeDefs([mainTypeDefs, typeDefs$1, typeDefs$2]);

const graphqlServer = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }) as any,
  context() {
    initializeAdmin();
    return {
      firestore: getFirestore(),
      jisho: new JishoAPI(),
      jdict: JDictAPI,
    };
  },
  graphqlEndpoint: "/api/graphql",
  plugins: [
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useResponseCache({
      session: () => null,
      ttl: 30_000,
      // @ts-ignore
      cache,
    }),
  ],
});
export default graphqlServer;
