import React, { useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const RangeContext = React.createContext();

export function RangeProvider(props) {
    const apiUrl = "/api/inrrange"
    const { getToken } = useContext(UserProfileContext)

    const addRange = (range) => {

        getToken().then((token) => fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(range)
        })

        )
    };

    return (

        <RangeContext.Provider value={{ addRange }}>
            {props.children}
        </RangeContext.Provider>
    );
}