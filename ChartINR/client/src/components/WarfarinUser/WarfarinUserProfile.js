import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { currentDate } from "../../components/Helper/HelperFunctions";
import { LevelContext } from "../../providers/LevelProvider";
import { Toast, Button, CardDeck, ToastHeader, ToastBody } from "reactstrap";
import Level from "../../components/Level/Level";

const WarfarinUserProfile = () => {
    const { levels, getMostRecentLevel, getLevels } = useContext(LevelContext);
    const [mostRecentLevel, setMostRecentLevel] = useState({ warfarinUser: {}, dose: {}, result: 0 });
    const { id } = useParams();
    const history = useHistory();

    const getMostRecent = () => {
        getMostRecentLevel(parseInt(id)).then(setMostRecentLevel);
    }

    useEffect(() => {
        getMostRecent()
    }, [id])

    if (!mostRecentLevel) return null;

    return (
        <>
            <h4>{mostRecentLevel.warfarinUser.displayName}'s Profile</h4>
            <Toast className="levelToast" >
                <ToastHeader>
                    Date Drawn: <strong>{currentDate(mostRecentLevel.dateDrawn)}</strong>
                    <p> Weekly Dose: {mostRecentLevel.dose.weeklyDose}</p>
                </ToastHeader>

                <ToastBody>
                    <p>Most Recent Result: <strong>{mostRecentLevel.result.toFixed(1)}</strong></p>
                    <p>In Range: {mostRecentLevel.inRange === 0 ? <p>No</p> : <p>Yes</p>}</p>
                    <hr />
                    {mostRecentLevel.comment !== null ?
                        <p>Comments: {mostRecentLevel.comment}</p> : null}
                </ToastBody>


                <div className="levelsButtonContainer">
                    {/* need to edit with modal */}
                    <Button className="levelsEdit--button" outline >Edit </Button>
                </div>
            </Toast>

            <div>
                <Link to={`/levels/${id}`}>Full INR History</Link>
            </div>



        </>


    )

}

export default WarfarinUserProfile;