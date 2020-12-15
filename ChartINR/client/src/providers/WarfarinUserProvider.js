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

    return (

        <WarfarinUserContext.Provider value={{ warfarinUsers, getWarfarinUsers }}>
            {props.children}
        </WarfarinUserContext.Provider>
    );
}