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
import IORedis from "ioredis";
import { createRedisCache } from "@envelop/response-cache-redis";
import { FirebaseDocs } from "@/src/const";
import CollectionReference = admin.firestore.CollectionReference;
import DocumentData = admin.firestore.DocumentData;

const redis = new IORedis({
  password: process.env.REDIS_PASSWORD!.trim(),
  host: process.env.REDIS_HOST!.trim(),
  port: Number(process.env.REDIS_PORT!.trim()),
});

const cache = createRedisCache({ redis });

export interface GraphQLContext extends YogaInitialContext {
  firestore: admin.firestore.Firestore;
  fsCollection: (docName: FirebaseDocs) => CollectionReference<DocumentData>;
  jisho: JishoAPI;
  jdict: typeof JDictAPI;
  cache: typeof cache;
}

const typeDefs = mergeTypeDefs([mainTypeDefs, typeDefs$1, typeDefs$2]);

const graphqlServer = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }) as any,
  context() {
    initializeAdmin();
    const firestore = getFirestore();
    return {
      firestore,
      fsCollection: (doc: FirebaseDocs) => firestore.collection(doc),
      jisho: new JishoAPI(),
      jdict: JDictAPI,
      cache,
    };
  },
  graphqlEndpoint: "/api/graphql",
  plugins: [
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useResponseCache({
      session: () => null,
      ttl: 300_000,
      // @ts-ignore
      cache,
    }),
  ],
});
export default graphqlServer;
