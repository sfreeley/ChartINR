import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { currentDate } from "../../components/Helper/HelperFunctions";
import { LevelContext } from "../../providers/LevelProvider";
import { ReminderContext } from "../../providers/ReminderProvider";
import { Toast, Button, CardDeck, ToastHeader, ToastBody } from "reactstrap";
import { WarfarinUserContext } from "../../providers/WarfarinUserProvider";
import { RangeContext } from "../../providers/RangeProvider";

const WarfarinUserProfile = () => {
    const { getMostRecentReminder } = useContext(ReminderContext);
    const { getMostRecentLevel } = useContext(LevelContext);
    const { getWarfarinUserById } = useContext(WarfarinUserContext);
    const { getRangeByUserId } = useContext(RangeContext);

    const [mostRecentLevel, setMostRecentLevel] = useState({ warfarinUser: {}, dose: {}, result: 0, inrRange: { minLevel: 0, maxLevel: 0 } });
    const [mostRecentReminder, setMostRecentReminder] = useState({});
    console.log(mostRecentReminder);
    const [warfarinUser, setWarfarinUser] = useState({});
    const [range, setRange] = useState({ minLevel: 0, maxLevel: 0 });
    console.log(range)
    //id is warfarin user's id
    const { id } = useParams();
    const history = useHistory();

    async function getRange() {

        await getRangeByUserId(parseInt(id)).then(setRange)
    }

    async function getRecentLevel() {
        await getMostRecentLevel(parseInt(id)).then(setMostRecentLevel)
    }

    async function getRecentReminder() {
        await getMostRecentReminder(parseInt(id)).then(setMostRecentReminder)
    }

    async function getUser() {
        await getWarfarinUserById(parseInt(id)).then(setWarfarinUser)
    }

    useEffect(() => {
        getUser();
        getRange();
        getRecentLevel();
        getRecentReminder();
    }, [id])

    if (!mostRecentLevel) return null;
    if (!range) return null;


    return (
        <>
            <h4>{warfarinUser.lastName}, {warfarinUser.firstName} Profile</h4>
            <Toast>
                <ToastHeader>
                    {mostRecentReminder === undefined ? <Link to="/reminder/add">Add Reminder</Link> : null}
                </ToastHeader>
                <ToastBody>
                    Next INR Draw: {mostRecentReminder === undefined ? <p>---</p> : currentDate(mostRecentReminder.dateOfNextLevel)}
                </ToastBody>
            </Toast>
            <Toast>
                <ToastHeader>
                    {/* need to write function for deactivation */}
                    {range.minLevel === 0 ? <Link to={`/range/${range.id}`}>Add INR Target Range</Link> : <Button>Deactivate Current INR Range</Button>}

                </ToastHeader>
                <ToastBody>
                    Current Range: {range.minLevel === 0 ? <strong>---</strong> : <strong>{range.minLevel.toFixed(1)} to {range.maxLevel.toFixed(1)}</strong>}
                    {/* {!mostRecentLevel.inrRange ? <strong>---</strong> : <strong>{mostRecentLevel.inrRange.minLevel.toFixed(1)} to {mostRecentLevel.inrRange.maxLevel.toFixed(1)}</strong>} */}
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
                    {!mostRecentLevel.result ? null :
                        <Button className="levelsEdit--button" outline >Edit </Button>}
                </div>
            </Toast>

            <div>
                <Link to={`/levels/${id}`}>Full INR History</Link>
            </div>



        </>


    )

}

export default WarfarinUserProfile;