import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import "./styles/Register.css";

export default function Register() {
    const history = useHistory();
    const { register } = useContext(UserProfileContext);

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    // //need to add this to a field
    // const [imageLocation, setImageLocation] = useState(" ");
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = { username, email };
            register(userProfile, password)
                .then(() => history.push("/"));
        }
    };

    return (
        <div className="register--container">
            <div className="logoImage--container">
                {/* <img className="logo--image" src="./images/puzzlepostlogo.png" alt="puzzleLogo" /> */}
            </div>
            <Form className="registerForm--container" onSubmit={registerClick}>
                <fieldset>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input id="username" type="text" onChange={e => setUsername(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup className="registerSubmitButton--formGroup">
                        <Button>Register</Button>
                    </FormGroup>
                    <em>
                        <p className="login--link"> Registered? <Link to="login">Login</Link></p>
                    </em>
                </fieldset>
            </Form>
        </div>
    );
}