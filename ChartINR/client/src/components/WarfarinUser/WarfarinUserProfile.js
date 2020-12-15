import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { currentDate } from "../../components/Helper/HelperFunctions";
import { LevelContext } from "../../providers/LevelProvider";
import { Toast, Button, CardDeck, ToastHeader, ToastBody } from "reactstrap";
import Level from "../../components/Level/Level";

const WarfarinUserProfile = () => {
    const { levels, getMostRecentLevel, getLevels } = useContext(LevelContext);
    const [mostRecentLevel, setMostRecentLevel] = useState({});
    const { id } = useParams();
    const history = useHistory();

    const getMostRecent = () => {
        getMostRecentLevel(parseInt(id)).then(setMostRecentLevel);
        // getLevels(parseInt(id));
    }

    useEffect(() => {
        getMostRecent()
    }, [id])

    if (!mostRecentLevel) return null;

    return (
        <>
            <h4>{mostRecentLevel.warfarinUser.displayName}'s Profile</h4>
            <Toast>
                <ToastHeader>
                    Date Drawn: {currentDate(mostRecentLevel.dateDrawn)}
                </ToastHeader>
                <ToastBody>
                    Most Recent Level: {mostRecentLevel.result}
                </ToastBody>

                <Button>Edit</Button>
            </Toast >



        </>


    )

}

export default WarfarinUserProfile;