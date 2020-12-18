import React, { useContext, useEffect, useState } from "react";
import { LevelContext } from "../../providers/LevelProvider";
import { useParams } from "react-router-dom";
import { CardDeck, Button } from "reactstrap";
import Level from "./Level";


const LevelList = () => {
    const { id } = useParams();
    const { getLevels, levels } = useContext(LevelContext);
    const [hidden, setHidden] = useState(true)
    const toggleLevels = () => setHidden(!hidden)


    useEffect(() => {
        // this will be specific to the warfarin user that the person who is logged in can see
        getLevels(parseInt(id))
    }, []);


    return (

        levels.length === 0 ? <strong>No Results History Available</strong> :
            <div className="levelsList">
                {/* show most recent INR level */}
                <Button className="toggleLevels" onClick={toggleLevels}>INR History</Button>
                {/* push user to new view with chart/graph? and stats?*/}
                <Button className="showChart">See INR Trends</Button>
                <CardDeck className="levelsList--container">

                    {levels.map((level) => {
                        return <Level key={level.id} level={level} hidden={hidden} />
                    })}

                </CardDeck>

            </div>

    )
}
export default LevelList;