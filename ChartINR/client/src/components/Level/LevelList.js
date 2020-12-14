import React, { useContext, useEffect, useState } from "react";
import { LevelContext } from "../../providers/LevelProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { CardDeck, Button } from "reactstrap";
import Level from "./Level";


const LevelList = () => {

    const { getLevels, levels } = useContext(LevelContext);
    const [hidden, setHidden] = useState(true)
    const toggleLevels = () => setHidden(!hidden)
    const { activeUser } = useContext(UserProfileContext)

    useEffect(() => {
        getLevels(parseInt(activeUser.id))
    }, []);


    return (
        <div className="LevelsList">
            {/* show most recent INR info */}
            <Button className="toggleLevels" onClick={toggleLevels}>Show INR History</Button>
            <Button className="showChart">See INR Trend</Button>
            <CardDeck className="LevelsList--container">

                {levels.map((level) => {
                    return <Level key={level.id} level={level} hidden={hidden} />
                })}

            </CardDeck>

        </div>

    )
}
export default LevelList;