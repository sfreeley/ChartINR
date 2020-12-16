import React, { useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const WarfarinUserContext = React.createContext();

export function WarfarinUserProvider(props) {
    const apiUrl = "/api/warfarinuser"
    const { getToken } = useContext(UserProfileContext)
    const [warfarinUsers, setWarfarinUsers] = useState([])

    const getWarfarinUsers = (userProfileId) => {
        return getToken().then((token) => fetch(`${apiUrl}/userprofile/${userProfileId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`

            },

        }).then(resp => resp.json()).then(setWarfarinUsers)

        )
    };

    const addWarfarinUser = (warfarinUser) => {
        return getToken().then((token) => fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(warfarinUser)
        })

        )
    };

    return (

        <WarfarinUserContext.Provider value={{ warfarinUsers, getWarfarinUsers, addWarfarinUser }}>
            {props.children}
        </WarfarinUserContext.Provider>
    );
}