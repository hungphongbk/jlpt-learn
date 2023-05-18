/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query AdminSearchFromJDict($word: String!) {\n    jdictSearchWord(word: $word) {\n      data {\n        id\n        word\n        kana\n        suggest_mean\n        isExist {\n          id\n          word\n          pronounce\n          explain\n          tags {\n            id\n          }\n        }\n        kanjis {\n          id\n          kanji\n          hanviet\n        }\n      }\n    }\n  }\n": types.AdminSearchFromJDictDocument,
    "\n  mutation AddNewWord($word: WordInsertInput!) {\n    addNewWord(word: $word) {\n      id\n    }\n  }\n": types.AddNewWordDocument,
    "\n  query AdminGetOneKanji($id: String!) {\n    kanji(id: $id) {\n      id\n      hv\n    }\n  }\n": types.AdminGetOneKanjiDocument,
    "\n  mutation AdminUpsertOneKanji($id: String!, $kanji: KanjiUpsertInput!) {\n    upsertKanji(id: $id, kanji: $kanji) {\n      id\n      hv\n    }\n  }\n": types.AdminUpsertOneKanjiDocument,
    "\n  query AdminAllTags {\n    tags {\n      id\n      label\n      children {\n        id\n        label\n      }\n    }\n  }\n": types.AdminAllTagsDocument,
    "\n  query AdminGetAllWord($where: WordQueryInput) {\n    words(where: $where) {\n      id\n      word\n      pronounce\n      explain\n    }\n  }\n": types.AdminGetAllWordDocument,
    "\n  query AdminSearchWord($word: String!) {\n    words(where: { word: { eq: $word } }) {\n      id\n      word\n      pronounce\n      explain\n      tags {\n        id\n      }\n      kanji {\n        id\n        hv\n      }\n    }\n  }\n": types.AdminSearchWordDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AdminSearchFromJDict($word: String!) {\n    jdictSearchWord(word: $word) {\n      data {\n        id\n        word\n        kana\n        suggest_mean\n        isExist {\n          id\n          word\n          pronounce\n          explain\n          tags {\n            id\n          }\n        }\n        kanjis {\n          id\n          kanji\n          hanviet\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query AdminSearchFromJDict($word: String!) {\n    jdictSearchWord(word: $word) {\n      data {\n        id\n        word\n        kana\n        suggest_mean\n        isExist {\n          id\n          word\n          pronounce\n          explain\n          tags {\n            id\n          }\n        }\n        kanjis {\n          id\n          kanji\n          hanviet\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddNewWord($word: WordInsertInput!) {\n    addNewWord(word: $word) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AddNewWord($word: WordInsertInput!) {\n    addNewWord(word: $word) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AdminGetOneKanji($id: String!) {\n    kanji(id: $id) {\n      id\n      hv\n    }\n  }\n"): (typeof documents)["\n  query AdminGetOneKanji($id: String!) {\n    kanji(id: $id) {\n      id\n      hv\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AdminUpsertOneKanji($id: String!, $kanji: KanjiUpsertInput!) {\n    upsertKanji(id: $id, kanji: $kanji) {\n      id\n      hv\n    }\n  }\n"): (typeof documents)["\n  mutation AdminUpsertOneKanji($id: String!, $kanji: KanjiUpsertInput!) {\n    upsertKanji(id: $id, kanji: $kanji) {\n      id\n      hv\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AdminAllTags {\n    tags {\n      id\n      label\n      children {\n        id\n        label\n      }\n    }\n  }\n"): (typeof documents)["\n  query AdminAllTags {\n    tags {\n      id\n      label\n      children {\n        id\n        label\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AdminGetAllWord($where: WordQueryInput) {\n    words(where: $where) {\n      id\n      word\n      pronounce\n      explain\n    }\n  }\n"): (typeof documents)["\n  query AdminGetAllWord($where: WordQueryInput) {\n    words(where: $where) {\n      id\n      word\n      pronounce\n      explain\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AdminSearchWord($word: String!) {\n    words(where: { word: { eq: $word } }) {\n      id\n      word\n      pronounce\n      explain\n      tags {\n        id\n      }\n      kanji {\n        id\n        hv\n      }\n    }\n  }\n"): (typeof documents)["\n  query AdminSearchWord($word: String!) {\n    words(where: { word: { eq: $word } }) {\n      id\n      word\n      pronounce\n      explain\n      tags {\n        id\n      }\n      kanji {\n        id\n        hv\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;