const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

// Load schema and resolvers
const typeDefs = require("./schema/schema");
const resolvers = require("./resolver/resolver");
const { connect } = require("mongoose");

const main = async () => {
  const app = express();

  //MONGODB_URI=mongodb://root:123@localhost:27017/
  const connectDB = async () => {
    try {
      await connect("mongodb://root:123@localhost:27017/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log("MongoDB connected");
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  };

  connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        settings: {
          // setting for access cookie
          ["request.credentials"]: "include",
        },
      }),
    ],
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

main().catch((error) => console.log(error));
