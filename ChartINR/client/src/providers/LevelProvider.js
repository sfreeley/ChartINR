import React, { useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const LevelContext = React.createContext();

export function LevelProvider(props) {
    const apiUrl = "/api/level"
    const { getToken } = useContext(UserProfileContext)
    const [levels, setLevels] = useState([])

    const getLevels = (userId) => {

        getToken().then((token) => fetch(`${apiUrl}/user/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },

        }).then((resp) => resp.json()).then((resp) => setLevels(resp)))
    };

    return (

        <LevelContext.Provider value={{ levels, getLevels }}>
            {props.children}
        </LevelContext.Provider>
    );
}