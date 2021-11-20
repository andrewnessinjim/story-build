import "./main.scss";

import React from "react";
import ReactDOM from "react-dom";

function HelloWorld(){
    return <p>Hello World!</p>
}

ReactDOM.render(
    <div>
        <HelloWorld/>
    </div>,
    document.getElementById("mount")
);