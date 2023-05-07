import { createSchema, createYoga, YogaInitialContext } from "graphql-yoga";

// @ts-ignore
import typeDefs from "./schema.graphql";

import resolvers from "./resolvers";
import { initializeAdmin } from "@/src/firebase-admin/firestore";
import { getFirestore } from "firebase-admin/firestore";
import admin from "firebase-admin";

export interface GraphQLContext extends YogaInitialContext {
  firestore: admin.firestore.Firestore;
}

const graphqlServer = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }) as any,
  context() {
    initializeAdmin();
    return {
      firestore: getFirestore(),
    };
  },
  graphqlEndpoint: "/api/graphql",
});
export default graphqlServer;
