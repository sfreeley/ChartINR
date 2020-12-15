import React, { useContext, useEffect, useState } from "react";
import { LevelContext } from "../../providers/LevelProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { CardDeck, Button } from "reactstrap";
import Level from "./Level";


const LevelList = () => {

    const { getLevels, levels } = useContext(LevelContext);
    const [hidden, setHidden] = useState(true)
    const toggleLevels = () => setHidden(!hidden)


    useEffect(() => {
        // this will be specific to the warfarin user that the person who is logged in can see
        getLevels()
    }, []);


    return (
        <div className="levelsList">
            {/* show most recent INR level */}
            <Button className="toggleLevels" onClick={toggleLevels}>INR History</Button>
            {/* push user to new view with chart/graph? and stats?*/}
            <Button className="showChart">See INR Trends</Button>
            {/* ability to add INR not related to reminder date... how to approach this?  */}
            <Button className="addLevel">Add INR Level</Button>
            <CardDeck className="levelsList--container">

                {levels.map((level) => {
                    return <Level key={level.id} level={level} hidden={hidden} />
                })}

            </CardDeck>

        </div>

    )
}
export default LevelList;