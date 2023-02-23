const { projects, clients } = require("../sampleData");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

// Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

// Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    client: {
      type: ClientType,
      resolve(parentValue, args) {
        return clients.find((client) => client.id === parentValue.clientId);
      },
    },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parentValue, args) {
        return clients;
      },
    },
    client: {
      type: ClientType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, args) {
        return clients.find((client) => client.id === args.id);
      },
    },
    // Projects
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, args) {
        return projects.find((project) => project.id === args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parentValue, args) {
        return projects;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
