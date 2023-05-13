import { GraphQLResolveInfo } from 'graphql';
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
  JishoAPIResult: ResolverTypeWrapper<JishoApiResult>;
  JishoJapaneseWord: ResolverTypeWrapper<JishoJapaneseWord>;
  JishoResult: ResolverTypeWrapper<JishoResult>;
  Kanji: ResolverTypeWrapper<Kanji>;
  KanjiUpsertInput: KanjiUpsertInput;
  KanjiUpsertInputPair: KanjiUpsertInputPair;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  StringComparator: StringComparator;
  Tag: ResolverTypeWrapper<Tag>;
  Word: ResolverTypeWrapper<Word>;
  WordInsertInput: WordInsertInput;
  WordQueryInput: WordQueryInput;
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
  JishoAPIResult: JishoApiResult;
  JishoJapaneseWord: JishoJapaneseWord;
  JishoResult: JishoResult;
  Kanji: Kanji;
  KanjiUpsertInput: KanjiUpsertInput;
  KanjiUpsertInputPair: KanjiUpsertInputPair;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  StringComparator: StringComparator;
  Tag: Tag;
  Word: Word;
  WordInsertInput: WordInsertInput;
  WordQueryInput: WordQueryInput;
};

export type JDictApiResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['JDictAPIResult'] = ResolversParentTypes['JDictAPIResult']> = {
  data?: Resolver<Array<ResolversTypes['JDictWord']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JDictKanjiResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['JDictKanji'] = ResolversParentTypes['JDictKanji']> = {
  hanviet?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  kanji?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JDictWordResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['JDictWord'] = ResolversParentTypes['JDictWord']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  kana?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  kanjis?: Resolver<Array<ResolversTypes['JDictKanji']>, ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggest_mean?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  word?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

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
  upsertKanji?: Resolver<ResolversTypes['Kanji'], ParentType, ContextType, RequireFields<MutationUpsertKanjiArgs, 'id' | 'kanji'>>;
  upsertKanjis?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpsertKanjisArgs, 'kanjis'>>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  jdictSearchWord?: Resolver<ResolversTypes['JDictAPIResult'], ParentType, ContextType, RequireFields<QueryJdictSearchWordArgs, 'word'>>;
  jishoSearchWord?: Resolver<ResolversTypes['JishoAPIResult'], ParentType, ContextType, RequireFields<QueryJishoSearchWordArgs, 'word'>>;
  kanji?: Resolver<ResolversTypes['Kanji'], ParentType, ContextType, RequireFields<QueryKanjiArgs, 'id'>>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  word?: Resolver<ResolversTypes['Word'], ParentType, ContextType, RequireFields<QueryWordArgs, 'id'>>;
  words?: Resolver<Maybe<Array<ResolversTypes['Word']>>, ParentType, ContextType, Partial<QueryWordsArgs>>;
};

export type TagResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WordResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Word'] = ResolversParentTypes['Word']> = {
  explain?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kanji?: Resolver<Maybe<Array<ResolversTypes['Kanji']>>, ParentType, ContextType>;
  pronounce?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Maybe<Array<ResolversTypes['Tag']>>, ParentType, ContextType>;
  word?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  JDictAPIResult?: JDictApiResultResolvers<ContextType>;
  JDictKanji?: JDictKanjiResolvers<ContextType>;
  JDictWord?: JDictWordResolvers<ContextType>;
  JishoAPIResult?: JishoApiResultResolvers<ContextType>;
  JishoJapaneseWord?: JishoJapaneseWordResolvers<ContextType>;
  JishoResult?: JishoResultResolvers<ContextType>;
  Kanji?: KanjiResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Word?: WordResolvers<ContextType>;
};

