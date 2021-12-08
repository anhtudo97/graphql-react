const express = require("express");
const { ApolloServer } = require("apollo-server-express");

// Load schema and resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");

const main = async () => {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

main().catch((error) => console.log(error));
