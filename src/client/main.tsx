import "./main.scss";

import React from "react";
import ReactDOM from "react-dom";

function HelloWorld(){
    return <h1>Hello World!</h1>
}

function onClickHandler() {
    console.log("Thank you!");
}

ReactDOM.render(
    <section>
        <HelloWorld/>
        <button onClick={onClickHandler}>Click Me!</button>
    </section>,
    document.getElementById("mount")
);