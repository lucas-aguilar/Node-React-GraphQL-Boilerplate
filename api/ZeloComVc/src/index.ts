import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
// import { typeDefs } from './typeDefs';
import { UserResolver } from './UserResolver';
import * as express from 'express';
import { buildSchema } from 'type-graphql';

const startServer = async () => {
  const app = express();

  await createConnection().then();

  console.log(process.env.ACCESS_TOKEN_SECRET);
  console.log(process.env.REFRESH_TOKEN_SECRET);

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  server.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
