/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../../context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateCommentInput: { // input type
    postId: number; // Int!
    text: string; // String!
  }
  CreatePostInput: { // input type
    body: string; // String!
    published: boolean; // Boolean!
    title: string; // String!
  }
  CreateUserInput: { // input type
    email: string; // String!
    password: string; // String!
    username: string; // String!
  }
  CreatedPostInput: { // input type
    authorId: number; // Int!
  }
  DeleteCommentInput: { // input type
    id: number; // Int!
  }
  DeletePostInput: { // input type
    id: number; // Int!
  }
  DeleteUserInput: { // input type
    id: number; // Int!
  }
  LoginUserInput: { // input type
    password: string; // String!
    username: string; // String!
  }
  UpdateCommentInput: { // input type
    id: number; // Int!
    text: string; // String!
  }
  UpdatePostInput: { // input type
    body?: string | null; // String
    id: number; // Int!
    published?: boolean | null; // Boolean
    title?: string | null; // String
  }
  UpdateUserInput: { // input type
    email: string; // String!
    id: number; // Int!
    password: string; // String!
    username: string; // String!
  }
}

export interface NexusGenEnums {
  SortOrder: "asc" | "desc"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthPayload: { // root type
    jwt?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Comment: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    text: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: {};
  Post: { // root type
    body?: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    published: boolean; // Boolean!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Query: {};
  User: { // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    jwt: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Comment: { // field return type
    author: NexusGenRootTypes['User']; // User!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    post: NexusGenRootTypes['Post']; // Post!
    text: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: { // field return type
    createComment: NexusGenRootTypes['Comment'] | null; // Comment
    createPost: NexusGenRootTypes['Post'] | null; // Post
    createUser: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    deleteComment: NexusGenRootTypes['Comment'] | null; // Comment
    deletePost: NexusGenRootTypes['Post'] | null; // Post
    deleteUser: NexusGenRootTypes['User']; // User!
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    updateComment: NexusGenRootTypes['Comment'] | null; // Comment
    updatePost: NexusGenRootTypes['Post'] | null; // Post
    updateUser: NexusGenRootTypes['User']; // User!
  }
  Post: { // field return type
    author: NexusGenRootTypes['User']; // User!
    body: string | null; // String
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    published: boolean; // Boolean!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Query: { // field return type
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    me: NexusGenRootTypes['User']; // User!
    myPosts: NexusGenRootTypes['Post'][]; // [Post!]!
    post: NexusGenRootTypes['Post']; // Post!
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  User: { // field return type
    comments: NexusGenRootTypes['Post'][]; // [Post!]!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string | null; // String
    id: number; // Int!
    password: string | null; // String
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    username: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AuthPayload: { // field return type name
    jwt: 'String'
    user: 'User'
  }
  Comment: { // field return type name
    author: 'User'
    createdAt: 'DateTime'
    id: 'Int'
    post: 'Post'
    text: 'String'
    updatedAt: 'DateTime'
  }
  Mutation: { // field return type name
    createComment: 'Comment'
    createPost: 'Post'
    createUser: 'AuthPayload'
    deleteComment: 'Comment'
    deletePost: 'Post'
    deleteUser: 'User'
    login: 'AuthPayload'
    updateComment: 'Comment'
    updatePost: 'Post'
    updateUser: 'User'
  }
  Post: { // field return type name
    author: 'User'
    body: 'String'
    createdAt: 'DateTime'
    id: 'Int'
    published: 'Boolean'
    title: 'String'
    updatedAt: 'DateTime'
  }
  Query: { // field return type name
    comments: 'Comment'
    me: 'User'
    myPosts: 'Post'
    post: 'Post'
    posts: 'Post'
    users: 'User'
  }
  User: { // field return type name
    comments: 'Post'
    createdAt: 'DateTime'
    email: 'String'
    id: 'Int'
    password: 'String'
    posts: 'Post'
    updatedAt: 'DateTime'
    username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createComment: { // args
      data: NexusGenInputs['CreateCommentInput']; // CreateCommentInput!
    }
    createPost: { // args
      data: NexusGenInputs['CreatePostInput']; // CreatePostInput!
    }
    createUser: { // args
      data: NexusGenInputs['CreateUserInput']; // CreateUserInput!
    }
    deleteComment: { // args
      data: NexusGenInputs['DeleteCommentInput']; // DeleteCommentInput!
    }
    deletePost: { // args
      data: NexusGenInputs['DeletePostInput']; // DeletePostInput!
    }
    deleteUser: { // args
      data: NexusGenInputs['DeleteUserInput']; // DeleteUserInput!
    }
    login: { // args
      data: NexusGenInputs['LoginUserInput']; // LoginUserInput!
    }
    updateComment: { // args
      data: NexusGenInputs['UpdateCommentInput']; // UpdateCommentInput!
    }
    updatePost: { // args
      data: NexusGenInputs['UpdatePostInput']; // UpdatePostInput!
    }
    updateUser: { // args
      data: NexusGenInputs['UpdateUserInput']; // UpdateUserInput!
    }
  }
  Query: {
    comments: { // args
      after?: number | null; // Int
      first?: number | null; // Int
      orderBy?: number | null; // Int
      skip?: number | null; // Int
    }
    myPosts: { // args
      after?: number | null; // Int
      first?: number | null; // Int
      orderBy?: number | null; // Int
      query?: string | null; // String
      skip?: number | null; // Int
    }
    post: { // args
      id: number; // Int!
    }
    posts: { // args
      after?: number | null; // Int
      first?: number | null; // Int
      orderBy?: number | null; // Int
      query?: string | null; // String
      skip?: number | null; // Int
    }
    users: { // args
      after?: number | null; // Int
      first?: number | null; // Int
      orderBy?: number | null; // Int
      query?: string | null; // String
      skip?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}