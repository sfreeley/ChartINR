import React, { useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const DoseContext = React.createContext();

export function DoseProvider(props) {
    const apiUrl = "/api/dose"
    const { getToken } = useContext(UserProfileContext)


    const getActiveDose = (warfarinUserId) => {
        return getToken().then((token) => fetch(`${apiUrl}/active/${warfarinUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },

        }).then((resp) => resp.json()));
    }

    return (

        <DoseContext.Provider value={{ getActiveDose }}>
            {props.children}
        </DoseContext.Provider>
    );
}