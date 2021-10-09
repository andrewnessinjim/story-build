const express = require("express"),
    {ApolloServer} = require("apollo-server-express"),
    {ApolloServerPluginDrainHttpServer} = require("apollo-server-core"),
    http = require("http"),
    fs = require("fs"),
    path =require("path");

const HTTP_PORT = 3001;

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation")

startApolloServer();

async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app);
    

    const server = new ApolloServer({
        typeDefs: fs.readFileSync(
            path.join(__dirname, 'schema.graphql'),
            'utf8'
        ),
        resolvers: {
            Query,
            Mutation
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    server.applyMiddleware({
        app
    });

    app.get("/", (req, res) => {
        res.end("Hello from within docker-compose!");
    });

    await new Promise(resolve => httpServer.listen({ port: HTTP_PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${HTTP_PORT}${server.graphqlPath}`);
}