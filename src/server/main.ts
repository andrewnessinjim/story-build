import express from "express";
import * as db from "./daos/db";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import http from "http";
import fs from "fs";
import path from "path";
import { ApolloServer } from "apollo-server-express";
import {ApolloServerPluginDrainHttpServer } from "apollo-server-core"

const HTTP_PORT:number = 3000;

const isDevelopment = process.env.NODE_ENV !== "production";

boot();

async function boot() {
    await db.connect();
    const app = express();
    setupRoutes(app);
    startApolloServer(app);
}

async function startApolloServer(app) {
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

    await new Promise(resolve => httpServer.listen({ port: HTTP_PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${HTTP_PORT}${server.graphqlPath}`);
}

function setupRoutes(app: any) {
    app.set("view engine", "pug");
    app.use(express.static("public"));

    app.get("/healthcheck", (req, res) => {
        const health = {
            message: "I am OK! Thanks for asking."
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(health));
    });

    const useExternalStyles = !isDevelopment;
    const scriptRoot = isDevelopment ? "http://localhost:8080" : "/build";

    app.get("/" , (req, res) => {
        res.render("index", {
            useExternalStyles,
            scriptRoot
        });
    });
}