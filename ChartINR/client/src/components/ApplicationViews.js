import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import LevelList from "./Level/LevelList";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import RangeForm from "./Range/RangeForm";
import LevelForm from "./Level/LevelForm";
import WarfarinUserList from "./WarfarinUser/WarfarinUserList";
import WarfarinUserProfile from "./WarfarinUser/WarfarinUserProfile";
import WarfarinUserForm from "./WarfarinUser/WarfarinUserForm";
import ReminderForm from "./Reminder/ReminderForm";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/reminder/add/:id">
                    {isLoggedIn ? <ReminderForm /> : <Redirect to="/login" />}
                </Route>
                <Route path="/user/profile/:id">
                    {isLoggedIn ? <WarfarinUserProfile /> : <Redirect to="/login" />}
                </Route>
                <Route path="/user/add">
                    {isLoggedIn ? <WarfarinUserForm /> : <Redirect to="/login" />}
                </Route>
                <Route path="/users">
                    {isLoggedIn ? <WarfarinUserList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/level/add/:id">
                    {isLoggedIn ? <LevelForm /> : <Redirect to="/login" />}
                </Route>
                <Route path="/levels/:id">
                    {isLoggedIn ? <LevelList /> : <Redirect to="/login" />}
                </Route>
                <Route path="/range/:id">
                    {isLoggedIn ? <RangeForm /> : <Redirect to="/login" />}
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
