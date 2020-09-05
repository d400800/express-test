const config = require('./config');
const todoRepository = require('./todo/todo-repository');

const { ApolloServer, gql } = require('apollo-server');

const MongoClient = require('mongodb').MongoClient;

let mongoDbClient;

MongoClient.connect(config.dbUrl, (err, client) => {
    console.log("Connected successfully to server");

    mongoDbClient = client.db('express_test_app_db');
});

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Todo" type defines the queryable fields for every book in our data source.
  type Todo {
    title: String
    isCompleted: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "todos" query returns an array of zero or more Books (defined above).
  type Query {
    todos(title: String): [Todo]
  }
`;

const resolvers = {
    Query: {
        todos: async  (parent, args, context, info) => todoRepository.loadDocuments(context, args),
    },
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({
        db: mongoDbClient
    })
});

apolloServer.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});