import React, { useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const LevelContext = React.createContext();

export function LevelProvider(props) {
    const apiUrl = "/api/level"
    const { getToken } = useContext(UserProfileContext)
    const [levels, setLevels] = useState([])

    const getLevels = (warfarinUserId) => {
        return getToken().then((token) => fetch(`${apiUrl}/user/${warfarinUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },

        }).then((resp) => resp.json()).then((resp) => setLevels(resp)))
    };

    const getMostRecentLevel = (warfarinUserId) => {
        return getToken().then((token) => fetch(`${apiUrl}/mostrecent/${warfarinUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },

        }).then((resp) => resp.json()));
    }

    return (

        <LevelContext.Provider value={{ levels, getLevels, getMostRecentLevel }}>
            {props.children}
        </LevelContext.Provider>
    );
}