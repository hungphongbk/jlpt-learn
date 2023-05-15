import type {
  BuildRedisEntityId,
  BuildRedisOperationResultCacheKey,
  RedisCacheParameter,
} from "@envelop/response-cache-redis";
import type { Cache } from "@envelop/response-cache";
import { createClient } from "@vercel/kv";

const kv = createClient({
  url: process.env.KV2_REST_API_URL ?? "",
  token: process.env.KV2_REST_API_TOKEN ?? "",
});

export const createRedisCache = (
  params: Omit<RedisCacheParameter, "redis">
): Cache => {
  const store = kv;

  const buildRedisEntityId =
    params?.buildRedisEntityId ?? defaultBuildRedisEntityId;
  const buildRedisOperationResultCacheKey =
    params?.buildRedisOperationResultCacheKey ??
    defaultBuildRedisOperationResultCacheKey;

  async function buildEntityInvalidationsKeys(
    entity: string
  ): Promise<string[]> {
    const keysToInvalidate: string[] = [entity];

    // find the responseIds for the entity
    const responseIds = await store.smembers(entity);
    // and add each response to be invalidated since they contained the entity data
    responseIds.forEach((responseId) => {
      keysToInvalidate.push(responseId);
      keysToInvalidate.push(buildRedisOperationResultCacheKey(responseId));
    });

    // if invalidating an entity like Comment, then also invalidate Comment:1, Comment:2, etc
    if (!entity.includes(":")) {
      const entityKeys = await store.keys(`${entity}:*`);
      for (const entityKey of entityKeys) {
        // and invalidate any responses in each of those entity keys
        const entityResponseIds = await store.smembers(entityKey);
        // if invalidating an entity check for associated operations containing that entity
        // and invalidate each response since they contained the entity data
        entityResponseIds.forEach((responseId) => {
          keysToInvalidate.push(responseId);
          keysToInvalidate.push(buildRedisOperationResultCacheKey(responseId));
        });

        // then the entityKeys like Comment:1, Comment:2 etc to be invalidated
        keysToInvalidate.push(entityKey);
      }
    }

    return keysToInvalidate;
  }

  return {
    async set(responseId, result, collectedEntities, ttl) {
      const pipeline = store.pipeline();

      if (ttl === Infinity) {
        pipeline.set(responseId, JSON.stringify(result));
      } else {
        // set the ttl in milliseconds
        pipeline.set(responseId, JSON.stringify(result), {
          px: ttl,
        });
      }

      const responseKey = buildRedisOperationResultCacheKey(responseId);

      for (const { typename, id } of collectedEntities) {
        // Adds a key for the typename => response
        pipeline.sadd(typename, responseId);
        // Adds a key for the operation => typename
        pipeline.sadd(responseKey, typename);

        if (id) {
          const entityId = buildRedisEntityId(typename, id);
          // Adds a key for the typename:id => response
          pipeline.sadd(entityId, responseId);
          // Adds a key for the operation => typename:id
          pipeline.sadd(responseKey, entityId);
        }
      }

      await pipeline.exec();
    },
    async get(responseId) {
      const result = await store.get<any>(responseId);
      return result;
    },
    async invalidate(entitiesToRemove) {
      const invalidationKeys: string[][] = [];

      for (const { typename, id } of entitiesToRemove) {
        invalidationKeys.push(
          await buildEntityInvalidationsKeys(
            id != null ? buildRedisEntityId(typename, id) : typename
          )
        );
      }

      const keys = invalidationKeys.flat();
      if (keys.length > 0) {
        await store.del(...keys);
      }
    },
  };
};

export const defaultBuildRedisEntityId: BuildRedisEntityId = (typename, id) =>
  `${typename}:${id}`;
export const defaultBuildRedisOperationResultCacheKey: BuildRedisOperationResultCacheKey =
  (responseId) => `operations:${responseId}`;
