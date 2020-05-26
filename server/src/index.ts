import 'dotenv/config';
import 'reflect-metadata';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import * as cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import * as cors from 'cors';

import { User } from './entity/User';
import { UserResolver } from './UserResolver';
import { createAccessToken, createRefreshToken } from './util/auth';
import { sendRefreshToken } from './util/sendRefreshToken';
const startServer = async () => {
  const app = express();
  app.use(
    // before applying middlewares
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use(cookieParser());
  // Special route for refreshing out of GraphQL
  app.post('/refresh_token', async (req, res) => {
    // MAKE SURE WE GET A TOKEN
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }
    // MAKE SURE ITS VALID
    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: '' });
    }

    // USE PAYLOAD TO LOAD AN USER
    console.log('payload:');
    console.log(payload);
    const user = await User.findOne(payload.userId);
    console.log('user:');
    console.log(user);
    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(user));

    // RETURN A NEW ACCESS TOKEN
    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  await createConnection().then();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  server.applyMiddleware({ app, cors: false });

  app.listen(4000, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
