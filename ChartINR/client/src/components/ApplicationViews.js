import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import LevelList from "./Level/LevelList";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Home from "../components/Home/Home";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/levels/:id">
                    {isLoggedIn ? <LevelList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/" exact>
                    {isLoggedIn ? <Home /> : <Redirect to="/login" />}
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
};
