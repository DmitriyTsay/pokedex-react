import React from "react";

export default function Card(props) {
    return (
        <div className={`card ${props.type}`}>
            <p className="gray">#{props.number}</p>
            <img src={props.img} alt="Pokemon"/>
            <h1>{props.name}</h1>
            <p>Type: {props.type}</p>
        </div>
    )
}