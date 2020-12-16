import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { currentDate } from "../../components/Helper/HelperFunctions";
import { LevelContext } from "../../providers/LevelProvider";
import { Toast, Button, CardDeck, ToastHeader, ToastBody } from "reactstrap";
import Level from "../../components/Level/Level";
import { WarfarinUserContext } from "../../providers/WarfarinUserProvider";

const WarfarinUserProfile = () => {
    const { levels, getMostRecentLevel, getLevels } = useContext(LevelContext);
    const { getWarfarinUserById } = useContext(WarfarinUserContext);


    const [mostRecentLevel, setMostRecentLevel] = useState({ warfarinUser: {}, dose: {}, result: 0, inrRange: { minLevel: 0, maxLevel: 0 } });
    console.log(mostRecentLevel)
    const [warfarinUser, setWarfarinUser] = useState({});
    //id is warfarin user's id
    const { id } = useParams();
    const history = useHistory();

    async function getMostRecent() {
        await getMostRecentLevel(parseInt(id)).then(setMostRecentLevel)

    }

    async function getUser() {
        await getWarfarinUserById(parseInt(id)).then(setWarfarinUser)
    }

    useEffect(() => {
        getMostRecent();
        getUser();
    }, [id])

    if (!mostRecentLevel) return null;

    return (
        <>
            <h4>{warfarinUser.lastName}, {warfarinUser.firstName} Profile</h4>
            <Toast>
                <ToastHeader>

                    {!mostRecentLevel.inrRange ? <Link to={"/range"}>Add INR Target Range</Link> : <Button>Deactivate Current INR Range</Button>}


                </ToastHeader>
                <ToastBody>
                    Current Range: {!mostRecentLevel.inrRange ? <strong>---</strong> : <strong>mostRecentLevel.inrRange.minLevel.toFixed(1) to {mostRecentLevel.inrRange.maxLevel.toFixed(1)}</strong>}
                    <p>Weekly Dose: {!mostRecentLevel.dose ? <strong>---</strong> : <p>{mostRecentLevel.dose.weeklyDose}</p>}</p>
                </ToastBody>
            </Toast>
            <Toast className="levelToast" >
                <ToastHeader>
                    Date Drawn: {mostRecentLevel.dateDrawn === "0001-01-01T00:00:00" ? <strong>---</strong> : <strong>{currentDate(mostRecentLevel.dateDrawn)}</strong>}

                </ToastHeader>

                <ToastBody>
                    <p>Most Recent Result: {!mostRecentLevel.result ? <strong>---</strong> : <strong>{mostRecentLevel.result.toFixed(1)}</strong>}</p>
                    <p>In Range: {!mostRecentLevel.inRange ? <strong>---</strong> : mostRecentLevel.inRange === 0 ? <p>No</p> : <p>Yes</p>}</p>
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