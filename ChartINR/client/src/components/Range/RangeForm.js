import React, { useState, useContext, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";
import { RangeContext } from "../../providers/RangeProvider";

const RangeForm = () => {
    const { updateRange, getRangeByUserId } = useContext(RangeContext);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const { id } = useParams();
    const [minLevel, setMinLevel] = useState();
    const [maxLevel, setMaxLevel] = useState();

    useEffect(() => {
        getRangeByUserId(parseInt(id)).then((range) => {
            setMinLevel(range.minLevel);
            setMaxLevel(range.maxLevel);
        })
    }, [])

    const submitRange = (e) => {

        e.preventDefault();
        setIsLoading(true);

        const updatedRange = {
            id: parseInt(id),
            minLevel,
            maxLevel
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

export default RangeForm;