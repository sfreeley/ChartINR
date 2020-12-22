import React, { useState, useContext, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";
import { RangeContext } from "../../providers/RangeProvider";
import { ReminderContext } from "../../providers/ReminderProvider";
import { DoseContext } from "../../providers/DoseProvider";
import { LevelContext } from "../../providers/LevelProvider";
import { currentDateFormat } from "../Helper/HelperFunctions";

const LevelForm = () => {
    const { getRangeByUserId } = useContext(RangeContext);
    const { getMostRecentReminder } = useContext(ReminderContext);
    const { getActiveDose } = useContext(DoseContext);
    const { addLevel } = useContext(LevelContext);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const { id } = useParams();
    const [range, setRange] = useState({ minLevel: 0, maxLevel: 0 });
    const [dose, setDose] = useState({});
    const [reminder, setReminder] = useState({});
    const [dateDrawn, setDateDrawn] = useState();
    const [comment, setComment] = useState();
    const [result, setResult] = useState();
    const [inRange, setInRange] = useState();

    async function getRange() {
        await getRangeByUserId(parseInt(id)).then((range) => setRange(range))
    }

    async function getReminder() {
        await getMostRecentReminder(parseInt(id)).then((reminder) => {
            setReminder(reminder)
            setDateDrawn(reminder.dateForNextLevel)
        })
    }

    async function getDose() {
        await getActiveDose(parseInt(id)).then((dose) => setDose(dose))
    }

    useEffect(() => {
        getRange();
        getReminder();
        getDose();
    }, [])

    const submitLevel = (e) => {

        e.preventDefault();
        setIsLoading(true);

        const level = {
            rangeId: range.id,
            doseId: dose.id,
            reminderId: reminder.id,
            dateDrawn: reminder.dateForNextLevel,
            comment,
            result,
            inRange

        };

        if (minLevel === 0 || maxLevel === 0) {
            alert("Please fill out all fields before submitting")
        }
        else {

            updateRange(updatedRange)
                .then(history.goBack())
        }
        setIsLoading(false);

    }

    if (!range) return null;
    if (!dose) return null;

    return (
        <div className="postForm--container">
            <div className="postFormSecondary--container">
                Target INR: <p>{range.minLevel.toFixed(1)} to {range.maxLevel.toFixed(1)} </p>
                Current Weekly Dose: <p>{dose.weeklyDose}</p>
                Date of Draw: <p>{currentDateFormat(dateDrawn)}</p>
                <Form className="postForm" responsive="true">
                    <fieldset>
                        <FormGroup>
                            <Label className="resultINR"><strong>Result</strong></Label>
                            <Input
                                className=""
                                onChange={(e) => setResult(e.target.value)}
                                type="text"
                                id="result"
                                placeholder="Enter Today's Level"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label className="commentINR"><strong>Comments (optional)</strong></Label>
                            <Input
                                className="INRRange"
                                onChange={(e) => setComment(e.target.value)}
                                type="textarea"
                                id="comment"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label className="inRangeINR"><strong>Was this level in range?</strong></Label>
                            <Input
                                className="INRRange"
                                onChange={(e) => setComment(e.target.value)}
                                type="textarea"
                                id="comment"
                            // placeholder="Enter Maximum INR Value"
                            />
                        </FormGroup>
                    </fieldset>
                    <Button onClick={submitLevel}>Record</Button>
                </Form>
            </div>
        </div>


    )


}

export default LevelForm;