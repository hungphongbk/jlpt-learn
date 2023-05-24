import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphQLContext } from '../src/graphql/graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  jdictSearchWord: JDictApiResult;
  jishoSearchWord: JishoApiResult;
  kanji: Kanji;
  tags?: Maybe<Array<Tag>>;
  word: Word;
  words: WordsResponse;
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ArrayStringComparator: ArrayStringComparator;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JDictAPIResult: ResolverTypeWrapper<JDictApiResult>;
  JDictKanji: ResolverTypeWrapper<JDictKanji>;
  JDictWord: ResolverTypeWrapper<JDictWord>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  JishoAPIResult: ResolverTypeWrapper<JishoApiResult>;
  JishoJapaneseWord: ResolverTypeWrapper<JishoJapaneseWord>;
  JishoResult: ResolverTypeWrapper<JishoResult>;
  Kanji: ResolverTypeWrapper<Kanji>;
  KanjiUpsertInput: KanjiUpsertInput;
  KanjiUpsertInputPair: KanjiUpsertInputPair;
  Mutation: ResolverTypeWrapper<{}>;
  PaginationData: ResolverTypeWrapper<PaginationData>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringComparator: StringComparator;
  Tag: ResolverTypeWrapper<Tag>;
  TagUpsertInput: TagUpsertInput;
  Word: ResolverTypeWrapper<Word>;
  WordExplain: ResolverTypeWrapper<WordExplain>;
  WordExplainInput: WordExplainInput;
  WordInsertInput: WordInsertInput;
  WordQueryInput: WordQueryInput;
  WordsResponse: ResolverTypeWrapper<WordsResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ArrayStringComparator: ArrayStringComparator;
  Boolean: Scalars['Boolean'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  JDictAPIResult: JDictApiResult;
  JDictKanji: JDictKanji;
  JDictWord: JDictWord;
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  JishoAPIResult: JishoApiResult;
  JishoJapaneseWord: JishoJapaneseWord;
  JishoResult: JishoResult;
  Kanji: Kanji;
  KanjiUpsertInput: KanjiUpsertInput;
  KanjiUpsertInputPair: KanjiUpsertInputPair;
  Mutation: {};
  PaginationData: PaginationData;
  Query: {};
  String: Scalars['String'];
  StringComparator: StringComparator;
  Tag: Tag;
  TagUpsertInput: TagUpsertInput;
  Word: Word;
  WordExplain: WordExplain;
  WordExplainInput: WordExplainInput;
  WordInsertInput: WordInsertInput;
  WordQueryInput: WordQueryInput;
  WordsResponse: WordsResponse;
};

export type JDictApiResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['JDictAPIResult'] = ResolversParentTypes['JDictAPIResult']> = {
  data?: Resolver<Array<ResolversTypes['JDictWord']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JDictKanjiResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['JDictKanji'] = ResolversParentTypes['JDictKanji']> = {
  hanviet?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isExist?: Resolver<Maybe<ResolversTypes['Kanji']>, ParentType, ContextType>;
  kanji?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JDictWordResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['JDictWord'] = ResolversParentTypes['JDictWord']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isExist?: Resolver<Maybe<ResolversTypes['Word']>, ParentType, ContextType>;
  kana?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  kanjis?: Resolver<Array<ResolversTypes['JDictKanji']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['JSONObject']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggest_mean?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  word?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type JishoApiResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['JishoAPIResult'] = ResolversParentTypes['JishoAPIResult']> = {
  data?: Resolver<Array<ResolversTypes['JishoResult']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JishoJapaneseWordResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['JishoJapaneseWord'] = ResolversParentTypes['JishoJapaneseWord']> = {
  reading?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  word?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JishoResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['JishoResult'] = ResolversParentTypes['JishoResult']> = {
  japanese?: Resolver<Array<ResolversTypes['JishoJapaneseWord']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type KanjiResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Kanji'] = ResolversParentTypes['Kanji']> = {
  hv?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addNewWord?: Resolver<ResolversTypes['Word'], ParentType, ContextType, RequireFields<MutationAddNewWordArgs, 'word'>>;
  setOppositeWord?: Resolver<ResolversTypes['Word'], ParentType, ContextType, RequireFields<MutationSetOppositeWordArgs, 'oppositeWordId' | 'wordID'>>;
  upsertKanji?: Resolver<ResolversTypes['Kanji'], ParentType, ContextType, RequireFields<MutationUpsertKanjiArgs, 'id' | 'kanji'>>;
  upsertKanjis?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpsertKanjisArgs, 'kanjis'>>;
  upsertTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationUpsertTagArgs, 'tag'>>;
};

export type PaginationDataResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['PaginationData'] = ResolversParentTypes['PaginationData']> = {
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  jdictSearchWord?: Resolver<ResolversTypes['JDictAPIResult'], ParentType, ContextType, RequireFields<QueryJdictSearchWordArgs, 'word'>>;
  jishoSearchWord?: Resolver<ResolversTypes['JishoAPIResult'], ParentType, ContextType, RequireFields<QueryJishoSearchWordArgs, 'word'>>;
  kanji?: Resolver<ResolversTypes['Kanji'], ParentType, ContextType, RequireFields<QueryKanjiArgs, 'id'>>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  word?: Resolver<ResolversTypes['Word'], ParentType, ContextType, RequireFields<QueryWordArgs, 'id'>>;
  words?: Resolver<ResolversTypes['WordsResponse'], ParentType, ContextType, Partial<QueryWordsArgs>>;
};

export type TagResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  children?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WordResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Word'] = ResolversParentTypes['Word']> = {
  explain?: Resolver<Array<ResolversTypes['WordExplain']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kanji?: Resolver<Maybe<Array<ResolversTypes['Kanji']>>, ParentType, ContextType>;
  opposite?: Resolver<Maybe<Array<ResolversTypes['Word']>>, ParentType, ContextType>;
  pronounce?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  word?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WordExplainResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['WordExplain'] = ResolversParentTypes['WordExplain']> = {
  explain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  preferredKana?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WordsResponseResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['WordsResponse'] = ResolversParentTypes['WordsResponse']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['Word']>>, ParentType, ContextType>;
  pagination?: Resolver<ResolversTypes['PaginationData'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  JDictAPIResult?: JDictApiResultResolvers<ContextType>;
  JDictKanji?: JDictKanjiResolvers<ContextType>;
  JDictWord?: JDictWordResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  JishoAPIResult?: JishoApiResultResolvers<ContextType>;
  JishoJapaneseWord?: JishoJapaneseWordResolvers<ContextType>;
  JishoResult?: JishoResultResolvers<ContextType>;
  Kanji?: KanjiResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PaginationData?: PaginationDataResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Word?: WordResolvers<ContextType>;
  WordExplain?: WordExplainResolvers<ContextType>;
  WordsResponse?: WordsResponseResolvers<ContextType>;
};

