import React, { useState, useContext } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { WarfarinUserContext } from "../../providers/WarfarinUserProvider";


const WarfarinUserForm = () => {
    const { addWarfarinUser } = useContext(WarfarinUserContext);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const submitUser = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const warfarinUser = {
            firstName,
            lastName,
        };

        if (firstName === "" || lastName === "") {
            alert("Please fill out all fields before submitting")
        }
        else {
            addWarfarinUser(warfarinUser)
                .then(() => history.push("/users"))
        }
        setIsLoading(false);

    }

    return (
        <div className="postForm--container">
            <div className="postFormSecondary--container">
                <Form className="postForm" responsive="true">
                    <fieldset>
                        <FormGroup>
                            <Label className=""><strong>First Name</strong></Label>
                            <Input
                                className="newPuzzle"
                                onChange={(e) => setFirstName(e.target.value)}
                                type="text"
                                id="firstName"
                                defaultValue={firstName}
                                placeholder="First Name"
                            />
                        </FormGroup>

                        <FormGroup>
                            {/* <Label className="ManufacturerLabel"><strong>Manufacturer</strong></Label> */}
                            <Input
                                className="INRRange"
                                onChange={(e) => setLastName(e.target.value)}
                                type="text"
                                id="lastName"
                                defaultValue={lastName}
                                placeholder="Last Name"
                            />
                        </FormGroup>
                    </fieldset>
                    <Button onClick={submitUser}>Record</Button>
                </Form>
            </div>
        </div>
    )
}

export default WarfarinUserForm;