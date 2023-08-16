# GraphQL Server Example

This example shows how to implement a **GraphQL server with TypeScript** with the following stack:

- @apollo/server
- graphql
- nexus

## Getting started

### 1. Download example and install dependencies

Download this example:

```sh
# Clone repository
git clone https://github.com/andrewbackdev/graphql-apollo-nexus-ts.git

# move to the folder
cd graphql-apollo-nexus-ts
```

Install npm dependencies:

```sh
npm ci
npm i -g prisma
```

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```sh
# generate graphql and nexus schemas
npm run generate

# deploy changes and reset database
prisma db push --force-reset

# just deploy changes
npm run prisma-deploy

# seed database with mock data
npm run seed
```

### 3. Run tests

```sh
# Run tests to ensure that all is fine
npm run test
```

### 3. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).
