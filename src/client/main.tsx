import "./main.scss";

import React from "react";
import ReactDOM from "react-dom";
import RoomList from "./components/RoomList";

import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache
} from '@apollo/client';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache()
});

function HelloWorld() {
    return <h1>Hello World!</h1>
}

function onClickHandler() {
    console.log("Thank you!");
}

ReactDOM.render(
    <ApolloProvider client={client}>
        <section>
            <HelloWorld/>
            <button onClick={onClickHandler}>Click Me!</button>
            <RoomList />
        </section>
    </ApolloProvider>,
    document.getElementById("mount")
);