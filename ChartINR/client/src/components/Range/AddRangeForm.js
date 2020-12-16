import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { useParams, useHistory } from "react-router-dom";
import { RangeContext } from "../../providers/RangeProvider";

const AddRangeForm = () => {
    const { addRange } = useContext(RangeContext);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const { id } = useParams();
    const [minLevel, setMinLevel] = useState(null);
    const [maxLevel, setMaxLevel] = useState(null);

    const submitRange = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const range = {
            minLevel,
            maxLevel
        };

        if (minLevel === null || maxLevel === null) {
            alert("Please fill out all fields before submitting")
        }
        else {
            addRange(range).then(() => history.goBack())
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
                                className="newPuzzle"
                                onChange={(e) => setMinLevel(parseFloat(e.target.value))}
                                type="text"
                                id="minLevel"
                                defaultValue={minLevel}
                                placeholder="Enter Minimum INR Value"
                            />
                        </FormGroup>
                        to
                        <FormGroup>
                            {/* <Label className="ManufacturerLabel"><strong>Manufacturer</strong></Label> */}
                            <Input
                                className="INRRange"
                                onChange={(e) => setMaxLevel(parseFloat(e.target.value))}
                                type="text"
                                id="maxLevel"
                                defaultValue={maxLevel}
                                placeholder="Enter Maximum INR Value"
                            />
                        </FormGroup>
                    </fieldset>
                    <button onClick={submitRange}>Record</button>
                </Form>
            </div>
        </div>


    )


}

export default AddRangeForm;