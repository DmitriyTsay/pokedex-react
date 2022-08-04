import React from "react";
import Card from "./Card";

export default function Main({cardsData, pokemonsData}) {

    function cards() {
        const result = pokemonsData.map((pokemon) => {
            return (
                cardsData[pokemon.name] === undefined 
                ?
                <Card /> 
                :
                <Card 
                name={cardsData[pokemon.name].name}
                img={cardsData[pokemon.name].sprites.other.dream_world.front_default}
                number={cardsData[pokemon.name].id}
                key={cardsData[pokemon.name].id}
                type={cardsData[pokemon.name].types[0].type.name}
                />
            )
        })

        return result;
    }

    return (
        <div className="main">
            {cards()}
        </div>
    )
}

