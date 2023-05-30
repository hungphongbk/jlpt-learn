import { GraphQLFieldConfig, GraphQLSchema } from "graphql/type";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver } from "@graphql-tools/executor";

function processLower(
  schema: GraphQLSchema,
  fieldConfig: GraphQLFieldConfig<any, any>
) {
  const upperDirective = getDirective(schema, fieldConfig, "lower")?.[0];

  if (upperDirective) {
    // Get this field's original resolver
    const { resolve = defaultFieldResolver } = fieldConfig;

    // Replace the original resolver with a function that *first* calls
    // the original resolver, then converts its result to upper case
    fieldConfig.resolve = async function (source, args, context, info) {
      const result = await resolve(source, args, context, info);
      if (typeof result === "string") {
        return result.toUpperCase();
      }
      return result;
    };
  }
}

export const refsDirectiveTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.OBJECT_FIELD](fieldConfig) {
      const refDirective = getDirective(schema, fieldConfig, "refs")?.[0];
      if (refDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        const { source } = refDirective;
        fieldConfig.resolve = async (src, args, context, info) => {
          // @ts-ignore
          return (prisma[source] as any)
            .findUnique({
              where: { id: src.id },
            })
            [fieldConfig.astNode!.name.value]();
        };
      }

      processLower(schema, fieldConfig);

      return fieldConfig;
    },
  });
