import React, { useState, useContext, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";
import { RangeContext } from "../../providers/RangeProvider";
import { ReminderContext } from "../../providers/ReminderProvider";
import { LevelContext } from "../../providers/LevelProvider";

const LevelForm = () => {
    const { getRangeByUserId } = useContext(RangeContext);
    const { getMostRecentReminder } = useContext(ReminderContext);
    const { addLevel } = useContext(LevelContext);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const { id } = useParams();
    const [range, setRange] = useState();
    const [reminder, setReminder] = useState();
    const [dateDrawn, setDateDrawn] = useState();
    const [comment, setComment] = useState();
    const [result, setResult] = useState();
    const [inRange, setInRange] = useState();

    async function getRange() {
        await getRangeByUserId(parseInt(id)).then((range) => setRange(range))
    }

    async function getReminder() {
        await getMostRecentReminder(parseInt(id)).then((reminder) => setReminder(reminder))
    }

    useEffect(() => {
        getRange();
        getReminder();
    }, [])

    const submitLevel = (e) => {

        e.preventDefault();
        setIsLoading(true);

        // const level = {
        //     rangeId:
        //         doseId:
        //     dateDrawn:
        //         comment,
        //     result,
        //     inRange

        // };

        if (minLevel === 0 || maxLevel === 0) {
            alert("Please fill out all fields before submitting")
        }
        else {

            updateRange(updatedRange)
                .then(history.goBack())
        }
        setIsLoading(false);

    }

    return (
        <div className="postForm--container">
            <div className="postFormSecondary--container">
                <Form className="postForm" responsive="true">
                    <fieldset>
                        <FormGroup>
                            <Label className="INRRange"><strong>Set INR Range</strong></Label>
                            <Input
                                className=""
                                onChange={(e) => setMinLevel(parseFloat(e.target.value))}
                                type="text"
                                id="minLevel"
                                placeholder="Enter Minimum INR Value"
                            />
                        </FormGroup>
                        to
                        <FormGroup>
                            <Input
                                className="INRRange"
                                onChange={(e) => setMaxLevel(parseFloat(e.target.value))}
                                type="text"
                                id="maxLevel"
                                placeholder="Enter Maximum INR Value"
                            />
                        </FormGroup>
                    </fieldset>
                    <Button onClick={submitRange}>Record</Button>
                </Form>
            </div>
        </div>


    )


}

export default LevelForm;