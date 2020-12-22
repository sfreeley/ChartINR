import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { currentDate } from "../../components/Helper/HelperFunctions";
import { LevelContext } from "../../providers/LevelProvider";
import { ReminderContext } from "../../providers/ReminderProvider";
import { Toast, Button, CardDeck, ToastHeader, ToastBody } from "reactstrap";
import { WarfarinUserContext } from "../../providers/WarfarinUserProvider";
import { RangeContext } from "../../providers/RangeProvider";

const WarfarinUserProfile = () => {
    const { getMostRecentReminder, deleteReminder } = useContext(ReminderContext);
    const { getMostRecentLevel } = useContext(LevelContext);
    const { getWarfarinUserById } = useContext(WarfarinUserContext);
    const { getRangeByUserId } = useContext(RangeContext);

    const [mostRecentLevel, setMostRecentLevel] = useState({ warfarinUser: {}, dose: {}, result: 0, inrRange: { minLevel: 0, maxLevel: 0 } });
    const [mostRecentReminder, setMostRecentReminder] = useState({});
    const [warfarinUser, setWarfarinUser] = useState({});
    const [range, setRange] = useState({ minLevel: 0, maxLevel: 0 });

    //id is warfarin user's id
    const { id } = useParams();
    const history = useHistory();

    async function changeDateForNextLevel() {
        await deleteReminder(parseInt(mostRecentReminder.id))
            .then(history.push(`/reminder/add/${id}`))
    }

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
        getRecentReminder();
        getRange();
        getRecentLevel();
    }, [id])

    if (!mostRecentLevel) return null;
    if (!range) return null;

    const calculateTimeLeftUntilNextLevel = () => {
        let dt1 = new Date(mostRecentReminder.dateForNextLevel);
        let dt2 = new Date();

        let difference = +dt1 - +dt2
        let timeLeftUntilDate = {}


        if (difference > 0 || difference < 0) {
            timeLeftUntilDate = {
                days: Math.ceil(difference / (1000 * 60 * 60 * 24)),
            }
        }

        return timeLeftUntilDate

    }

    const [timeLeftUntilDate, setTimeLeftUntilDate] = useState(calculateTimeLeftUntilNextLevel());
    console.log(timeLeftUntilDate)
    const pastDueLevel = timeLeftUntilDate.days <= -1;
    const timerInDays = [];

    //every time timeLeftUntilDate is updated in state, useEffect will fire
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeftUntilDate(calculateTimeLeftUntilNextLevel());
        }, 1000);
        // runs every time useEffect runs except first run and will clear the timer if component is not mounted
        return () => clearTimeout(timer);
    });

    //iterate through the keys of the timeLeftUntilDate object (ie days)
    //if the property of days in the timeLeftUntilDate does not have valid value, return, else push the following jsx
    //into timerInDays array 'value of days property' 'days' 'until refill or renewal'
    const oneDayUntilLevel = timeLeftUntilDate.days === 1;
    Object.keys(timeLeftUntilDate).forEach((interval) => {
        if (!timeLeftUntilDate[interval]) {
            return
        }

        timerInDays.push(
            <span key={mostRecentReminder.id}>
                <strong>{timeLeftUntilDate[interval]}</strong> {interval} {`until next level`}
            </span>
        )

    })


    return (
        <>
            <h4>{warfarinUser.lastName}, {warfarinUser.firstName} Profile</h4>
            <Toast>
                <ToastHeader>
                    {mostRecentReminder.dateForNextLevel === undefined ? <Link to={`/reminder/add/${id}`}>Add Reminder</Link> : null}
                </ToastHeader>
                <ToastBody>

                    {mostRecentReminder.dateForNextLevel === undefined ? null : <p>Next INR Draw: {currentDate(mostRecentReminder.dateForNextLevel)}</p>}
                    <p>{pastDueLevel ? <Button onClick={changeDateForNextLevel}>Past Due: Reschedule Next Level</Button> : oneDayUntilLevel ? <p> <strong>1</strong> day until next level</p> : timerInDays.length ? timerInDays : !mostRecentReminder ? null : <Link to={`/level/add/${id}`}><strong>Draw Level Today</strong></Link>}</p>
                </ToastBody>
            </Toast>
            <Toast>
                <ToastHeader>
                    {<Link to="/dose/add">Add Dose</Link>}
                </ToastHeader>
                <ToastBody>
                    Weekly Dose:
                </ToastBody>
            </Toast>
            <Toast>
                <ToastHeader>
                    {/* need to write function for deactivation */}
                    {range.minLevel === 0 ? <Link to={`/range/${range.id}`}>Add INR Target Range</Link> : <Button>Deactivate Current INR Range</Button>}

                </ToastHeader>
                <ToastBody>
                    Current Range: {range.minLevel === 0 ? <strong>---</strong> : <strong>{range.minLevel.toFixed(1)} to {range.maxLevel.toFixed(1)}</strong>}
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