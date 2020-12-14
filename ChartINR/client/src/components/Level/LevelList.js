import React, { useContext, useEffect, useState } from "react";
import { LevelContext } from "../../providers/LevelProvider";
import { CardDeck } from "reactstrap";
import Level from "./Level";


const LevelList = () => {

    const { getLevels, levels } = useContext(LevelContext);

    useEffect(() => {
        getLevels()
    }, []);


    return (
        <div className="LevelsList">


            <CardDeck className="LevelsList--container">

                {levels.map((level) => {
                    return <Level key={level.id} level={level} />
                })}

            </CardDeck>

        </div>

    )
}
export default LevelList;