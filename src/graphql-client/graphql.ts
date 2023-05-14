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
};

export type ArrayStringComparator = {
  arrayContains?: InputMaybe<Array<Scalars['String']>>;
  arrayContainsAny?: InputMaybe<Array<Scalars['String']>>;
};

export type JDictApiResult = {
  __typename?: 'JDictAPIResult';
  data: Array<JDictWord>;
};

export type JDictKanji = {
  __typename?: 'JDictKanji';
  hanviet: Scalars['String'];
  id: Scalars['Int'];
  kanji: Scalars['String'];
};

export type JDictWord = {
  __typename?: 'JDictWord';
  id: Scalars['Int'];
  kana: Scalars['String'];
  kanjis: Array<JDictKanji>;
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

export type Mutation = {
  __typename?: 'Mutation';
  addNewWord: Word;
  upsertKanji: Kanji;
  upsertKanjis: Scalars['Boolean'];
};


export type MutationAddNewWordArgs = {
  word: WordInsertInput;
};


export type MutationUpsertKanjiArgs = {
  id: Scalars['String'];
  kanji: KanjiUpsertInput;
};


export type MutationUpsertKanjisArgs = {
  kanjis: Array<KanjiUpsertInputPair>;
};

export type Query = {
  __typename?: 'Query';
  jdictSearchWord: JDictApiResult;
  jishoSearchWord: JishoApiResult;
  kanji: Kanji;
  tags?: Maybe<Array<Tag>>;
  word: Word;
  words?: Maybe<Array<Word>>;
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
  where?: InputMaybe<WordQueryInput>;
};

export type StringComparator = {
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  neq?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  label: Scalars['String'];
};

export type Word = {
  __typename?: 'Word';
  explain: Scalars['String'];
  id: Scalars['ID'];
  kanji?: Maybe<Array<Kanji>>;
  pronounce: Scalars['String'];
  tags?: Maybe<Array<Tag>>;
  word: Scalars['String'];
};

export type WordInsertInput = {
  explain: Scalars['String'];
  pronounce: Scalars['String'];
  tags?: InputMaybe<Array<Scalars['String']>>;
  word: Scalars['String'];
};

export type WordQueryInput = {
  tags?: InputMaybe<ArrayStringComparator>;
  word?: InputMaybe<StringComparator>;
};

export type AdminGetAllWordQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminGetAllWordQuery = { __typename?: 'Query', words?: Array<{ __typename?: 'Word', id: string, word: string, pronounce: string }> | null };

export type AdminSearchFromJDictQueryVariables = Exact<{
  word: Scalars['String'];
}>;


export type AdminSearchFromJDictQuery = { __typename?: 'Query', jdictSearchWord: { __typename?: 'JDictAPIResult', data: Array<{ __typename?: 'JDictWord', id: number, word: string, kana: string, suggest_mean: string }> } };

export type AddNewWordMutationVariables = Exact<{
  word: WordInsertInput;
}>;


export type AddNewWordMutation = { __typename?: 'Mutation', addNewWord: { __typename?: 'Word', id: string } };

export type AdminGetOneKanjiQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type AdminGetOneKanjiQuery = { __typename?: 'Query', kanji: { __typename?: 'Kanji', id: string, hv?: string | null } };

export type AdminUpsertOneKanjiMutationVariables = Exact<{
  id: Scalars['String'];
  kanji: KanjiUpsertInput;
}>;


export type AdminUpsertOneKanjiMutation = { __typename?: 'Mutation', upsertKanji: { __typename?: 'Kanji', id: string, hv?: string | null } };

export type AdminAllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminAllTagsQuery = { __typename?: 'Query', tags?: Array<{ __typename?: 'Tag', id: string }> | null };


export const AdminGetAllWordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminGetAllWord"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"words"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"word"}},{"kind":"Field","name":{"kind":"Name","value":"pronounce"}}]}}]}}]} as unknown as DocumentNode<AdminGetAllWordQuery, AdminGetAllWordQueryVariables>;
export const AdminSearchFromJDictDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminSearchFromJDict"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"word"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jdictSearchWord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"word"},"value":{"kind":"Variable","name":{"kind":"Name","value":"word"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"word"}},{"kind":"Field","name":{"kind":"Name","value":"kana"}},{"kind":"Field","name":{"kind":"Name","value":"suggest_mean"}}]}}]}}]}}]} as unknown as DocumentNode<AdminSearchFromJDictQuery, AdminSearchFromJDictQueryVariables>;
export const AddNewWordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddNewWord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"word"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WordInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addNewWord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"word"},"value":{"kind":"Variable","name":{"kind":"Name","value":"word"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddNewWordMutation, AddNewWordMutationVariables>;
export const AdminGetOneKanjiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminGetOneKanji"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"kanji"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hv"}}]}}]}}]} as unknown as DocumentNode<AdminGetOneKanjiQuery, AdminGetOneKanjiQueryVariables>;
export const AdminUpsertOneKanjiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpsertOneKanji"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"kanji"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"KanjiUpsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertKanji"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"kanji"},"value":{"kind":"Variable","name":{"kind":"Name","value":"kanji"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hv"}}]}}]}}]} as unknown as DocumentNode<AdminUpsertOneKanjiMutation, AdminUpsertOneKanjiMutationVariables>;
export const AdminAllTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminAllTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AdminAllTagsQuery, AdminAllTagsQueryVariables>;