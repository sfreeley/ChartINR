import React, { useState, useContext, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";
import { ReminderContext } from "../../providers/ReminderProvider";

const ReminderForm = () => {
    const { addReminder } = useContext(ReminderContext);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const { id } = useParams();
    const [dateForNextLevel, setDate] = useState();


    // useEffect(() => {
    //     getRangeByUserId(parseInt(id)).then((range) => {
    //         setMinLevel(range.minLevel);
    //         setMaxLevel(range.maxLevel);
    //     })
    // }, [])

    const submitReminder = (e) => {

        e.preventDefault();
        setIsLoading(true);

        const dateToSubmit = {
            warfarinUserId: parseInt(id),
            dateForNextLevel

        };

        if (dateForNextLevel === "") {
            alert("Please specify date for next level")
        }
        else {

            addReminder(dateToSubmit)
                .then(history.push(`/user/profile/${id}`))
        }
        setIsLoading(false);

    }

    return (
        <div className="postForm--container">
            <div className="postFormSecondary--container">
                <Form className="postForm" responsive="true">
                    <fieldset>
                        <FormGroup>
                            <Label className="INRRange"><strong>Select Date For Next Level:</strong></Label>
                            <Input
                                className=""
                                onChange={(e) => setDate(e.target.value)}
                                type="date"
                                id="minLevel"
                                placeholder="Enter Minimum INR Value"
                            />
                        </FormGroup>
                    </fieldset>
                    <Button onClick={submitReminder}>Record</Button>
                </Form>
            </div>
        </div>


    )


}

export default ReminderForm;