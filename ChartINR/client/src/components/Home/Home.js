import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import { RangeContext } from "../../providers/RangeProvider";

const Home = () => {
    const { addRange } = useContext(RangeContext);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const [minLevel, setMinLevel] = useState(null);
    const [maxLevel, setMaxLevel] = useState(null);

    const submitRange = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const range = {
            minLevel,
            maxLevel
        };

        addRange(range)
        // .then(() => history.push("/results"))
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
                                className="newPuzzle"
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

export default Home;