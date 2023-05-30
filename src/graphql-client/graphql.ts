/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: Record<string,any>;
  JSONObject: Record<string,any>;
};

export type ArrayStringComparator = {
  arrayContainsAny?: InputMaybe<Array<Scalars['String']>>;
};

export type Game = {
  __typename?: 'Game';
  scenes: Array<GameScene>;
};

export type GameInput = {
  numberOfMatches: Scalars['Int'];
  tags: Array<Scalars['String']>;
};

export type GameScene = MixMatchScene | WordToTextScene;

export type JDictApiResult = {
  __typename?: 'JDictAPIResult';
  data: Array<JDictWord>;
};

export type JDictKanji = {
  __typename?: 'JDictKanji';
  hanviet: Scalars['String'];
  id: Scalars['Int'];
  isExist?: Maybe<Kanji>;
  kanji: Scalars['String'];
};

export type JDictWord = {
  __typename?: 'JDictWord';
  id: Scalars['Int'];
  isExist?: Maybe<Word>;
  kana: Scalars['String'];
  kanjis: Array<JDictKanji>;
  level?: Maybe<Scalars['JSONObject']>;
  slug: Scalars['String'];
  suggest_mean: Scalars['String'];
  word: Scalars['String'];
};

export type JishoApiResult = {
  __typename?: 'JishoAPIResult';
  data: Array<JishoResult>;
};

export type JishoJapaneseWord = {
  __typename?: 'JishoJapaneseWord';
  reading?: Maybe<Scalars['String']>;
  word?: Maybe<Scalars['String']>;
};

export type JishoResult = {
  __typename?: 'JishoResult';
  japanese: Array<JishoJapaneseWord>;
};

export type Kanji = {
  __typename?: 'Kanji';
  hv?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type KanjiUpsertInput = {
  hv: Scalars['String'];
};

export type KanjiUpsertInputPair = {
  hv: Scalars['String'];
  id: Scalars['String'];
};

export type MixMatchScene = {
  __typename?: 'MixMatchScene';
  comparison: Array<Array<Scalars['Int']>>;
  left: Array<Scalars['String']>;
  right: Array<Scalars['String']>;
  totalRows: Scalars['Int'];
  type: SceneType;
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewWord: Word;
  setOppositeWord: Word;
  upsertKanji: Kanji;
  upsertKanjis: Scalars['Boolean'];
  upsertTag: Tag;
};


export type MutationAddNewWordArgs = {
  word: WordInsertInput;
};


export type MutationSetOppositeWordArgs = {
  oppositeWordId: Scalars['String'];
  wordID: Scalars['String'];
};


export type MutationUpsertKanjiArgs = {
  id: Scalars['String'];
  kanji: KanjiUpsertInput;
};


export type MutationUpsertKanjisArgs = {
  kanjis: Array<KanjiUpsertInputPair>;
};


export type MutationUpsertTagArgs = {
  tag: TagUpsertInput;
};

export type PaginationData = {
  __typename?: 'PaginationData';
  page: Scalars['Int'];
  totalPage: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  game: Game;
  jdictSearchWord: JDictApiResult;
  jishoSearchWord: JishoApiResult;
  kanji: Kanji;
  tags?: Maybe<Array<Tag>>;
  word: Word;
  words: WordsResponse;
};


export type QueryGameArgs = {
  input: GameInput;
};


export type QueryJdictSearchWordArgs = {
  word: Scalars['String'];
};


export type QueryJishoSearchWordArgs = {
  word: Scalars['String'];
};


export type QueryKanjiArgs = {
  id: Scalars['String'];
};


export type QueryWordArgs = {
  id: Scalars['String'];
};


export type QueryWordsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WordQueryInput>;
};

export enum SceneType {
  MixMatch = 'MIX_MATCH',
  WordToText = 'WORD_TO_TEXT'
}

export type StringComparator = {
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  neq?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type Tag = {
  __typename?: 'Tag';
  children?: Maybe<Array<Tag>>;
  id: Scalars['String'];
  label: Scalars['String'];
  parent?: Maybe<Tag>;
};

export type TagUpsertInput = {
  id: Scalars['String'];
  label?: InputMaybe<Scalars['String']>;
  parentId?: InputMaybe<Scalars['String']>;
};

export type Word = {
  __typename?: 'Word';
  explain: Array<WordExplain>;
  id: Scalars['ID'];
  kanji?: Maybe<Array<Kanji>>;
  opposite?: Maybe<Array<Word>>;
  pronounce: Scalars['String'];
  tags?: Maybe<Array<Tag>>;
  word: Scalars['String'];
};

export type WordExplain = {
  __typename?: 'WordExplain';
  explain: Scalars['String'];
  preferredKana?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Array<Tag>>;
};

export type WordExplainInput = {
  explain: Scalars['String'];
  preferredKana?: InputMaybe<Scalars['Boolean']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type WordInsertInput = {
  explain: Array<WordExplainInput>;
  id?: InputMaybe<Scalars['String']>;
  pronounce: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  word: Scalars['String'];
};

export type WordQueryInput = {
  tags?: InputMaybe<ArrayStringComparator>;
  word?: InputMaybe<StringComparator>;
};

export type WordToTextScene = {
  __typename?: 'WordToTextScene';
  romaji: Scalars['String'];
  type: SceneType;
  word: Scalars['String'];
};

export type WordsResponse = {
  __typename?: 'WordsResponse';
  data?: Maybe<Array<Word>>;
  pagination: PaginationData;
};

export type AdminGetOneKanjiQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type AdminGetOneKanjiQuery = { __typename?: 'Query', kanji: { __typename?: 'Kanji', id: string, hv?: string | null } };

export type AdminUpsertOneKanjiMutationVariables = Exact<{
  id: Scalars['String'];
  kanji: KanjiUpsertInput;
}>;


export type AdminUpsertOneKanjiMutation = { __typename?: 'Mutation', upsertKanji: { __typename?: 'Kanji', id: string, hv?: string | null } };

export type AdminGetOneWordQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type AdminGetOneWordQuery = { __typename?: 'Query', word: { __typename?: 'Word', id: string, word: string, pronounce: string, explain: Array<{ __typename?: 'WordExplain', explain: string, preferredKana?: boolean | null }>, kanji?: Array<{ __typename?: 'Kanji', id: string, hv?: string | null }> | null, tags?: Array<{ __typename?: 'Tag', id: string }> | null } };

export type AdminSearchFromJDictQueryVariables = Exact<{
  word: Scalars['String'];
}>;


export type AdminSearchFromJDictQuery = { __typename?: 'Query', jdictSearchWord: { __typename?: 'JDictAPIResult', data: Array<{ __typename?: 'JDictWord', id: number, word: string, kana: string, suggest_mean: string, level?: Record<string,any> | null, isExist?: { __typename?: 'Word', id: string, word: string, pronounce: string, explain: Array<{ __typename?: 'WordExplain', explain: string }>, tags?: Array<{ __typename?: 'Tag', id: string }> | null } | null, kanjis: Array<{ __typename?: 'JDictKanji', id: number, kanji: string, hanviet: string, isExist?: { __typename?: 'Kanji', id: string, hv?: string | null } | null }> }> } };

export type AdminUpsertTagMutationVariables = Exact<{
  input: TagUpsertInput;
}>;


export type AdminUpsertTagMutation = { __typename?: 'Mutation', upsertTag: { __typename?: 'Tag', id: string } };

export type AdminAllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminAllTagsQuery = { __typename?: 'Query', tags?: Array<{ __typename?: 'Tag', id: string, label: string, children?: Array<{ __typename?: 'Tag', id: string, label: string }> | null }> | null };

export type AdminGetAllWordQueryVariables = Exact<{
  where?: InputMaybe<WordQueryInput>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type AdminGetAllWordQuery = { __typename?: 'Query', words: { __typename?: 'WordsResponse', pagination: { __typename?: 'PaginationData', page: number, totalPage: number }, data?: Array<{ __typename?: 'Word', id: string, word: string, pronounce: string, explain: Array<{ __typename?: 'WordExplain', explain: string }> }> | null } };

export type AdminSearchWordQueryVariables = Exact<{
  word: Scalars['String'];
}>;


export type AdminSearchWordQuery = { __typename?: 'Query', words: { __typename?: 'WordsResponse', data?: Array<{ __typename?: 'Word', id: string, word: string, pronounce: string, explain: Array<{ __typename?: 'WordExplain', explain: string }>, tags?: Array<{ __typename?: 'Tag', id: string }> | null, kanji?: Array<{ __typename?: 'Kanji', id: string, hv?: string | null }> | null }> | null } };

export type AddNewWordMutationVariables = Exact<{
  word: WordInsertInput;
}>;


export type AddNewWordMutation = { __typename?: 'Mutation', addNewWord: { __typename?: 'Word', id: string } };


export const AdminGetOneKanjiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminGetOneKanji"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"kanji"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hv"}}]}}]}}]} as unknown as DocumentNode<AdminGetOneKanjiQuery, AdminGetOneKanjiQueryVariables>;
export const AdminUpsertOneKanjiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpsertOneKanji"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"kanji"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"KanjiUpsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertKanji"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"kanji"},"value":{"kind":"Variable","name":{"kind":"Name","value":"kanji"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hv"}}]}}]}}]} as unknown as DocumentNode<AdminUpsertOneKanjiMutation, AdminUpsertOneKanjiMutationVariables>;
export const AdminGetOneWordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminGetOneWord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"word"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"word"}},{"kind":"Field","name":{"kind":"Name","value":"pronounce"}},{"kind":"Field","name":{"kind":"Name","value":"explain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"explain"}},{"kind":"Field","name":{"kind":"Name","value":"preferredKana"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kanji"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hv"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<AdminGetOneWordQuery, AdminGetOneWordQueryVariables>;
export const AdminSearchFromJDictDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminSearchFromJDict"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"word"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jdictSearchWord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"word"},"value":{"kind":"Variable","name":{"kind":"Name","value":"word"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"word"}},{"kind":"Field","name":{"kind":"Name","value":"kana"}},{"kind":"Field","name":{"kind":"Name","value":"suggest_mean"}},{"kind":"Field","name":{"kind":"Name","value":"isExist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"word"}},{"kind":"Field","name":{"kind":"Name","value":"pronounce"}},{"kind":"Field","name":{"kind":"Name","value":"explain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"explain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"kanjis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kanji"}},{"kind":"Field","name":{"kind":"Name","value":"hanviet"}},{"kind":"Field","name":{"kind":"Name","value":"isExist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hv"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}}]}}]}}]} as unknown as DocumentNode<AdminSearchFromJDictQuery, AdminSearchFromJDictQueryVariables>;
export const AdminUpsertTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpsertTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagUpsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AdminUpsertTagMutation, AdminUpsertTagMutationVariables>;
export const AdminAllTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminAllTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}}]} as unknown as DocumentNode<AdminAllTagsQuery, AdminAllTagsQueryVariables>;
export const AdminGetAllWordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminGetAllWord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"WordQueryInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"words"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"totalPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"word"}},{"kind":"Field","name":{"kind":"Name","value":"pronounce"}},{"kind":"Field","name":{"kind":"Name","value":"explain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"explain"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminGetAllWordQuery, AdminGetAllWordQueryVariables>;
export const AdminSearchWordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminSearchWord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"word"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"words"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"word"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"word"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"word"}},{"kind":"Field","name":{"kind":"Name","value":"pronounce"}},{"kind":"Field","name":{"kind":"Name","value":"explain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"explain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kanji"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hv"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AdminSearchWordQuery, AdminSearchWordQueryVariables>;
export const AddNewWordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddNewWord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"word"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WordInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addNewWord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"word"},"value":{"kind":"Variable","name":{"kind":"Name","value":"word"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddNewWordMutation, AddNewWordMutationVariables>;