import { GraphQLSchema } from "graphql/type";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { firestore } from "firebase-admin";
import { convertSnapshot } from "@/src/graphql/utils/convert";
import { defaultFieldResolver } from "@graphql-tools/executor";
import DocumentReference = firestore.DocumentReference;

export const refsDirectiveTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD](fieldConfig) {
      const directive = getDirective(schema, fieldConfig, "refs")?.[0];
      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async (source, args, context, info) => {
          const _refs = (await resolve(
            source,
            args,
            context,
            info
          )) as unknown as DocumentReference[];
          // console.log(fieldConfig);
          // console.log(_refs);
          const refs = await context.firestore.getAll(..._refs);
          return refs.map ? refs.map(convertSnapshot) : null;
        };

        return fieldConfig;
      }
    },
  });
