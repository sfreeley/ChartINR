import React, { useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const RangeContext = React.createContext();

export function RangeProvider(props) {
    const apiUrl = "/api/inrrange"
    const { getToken } = useContext(UserProfileContext)

    const getRangeByUserId = (warfarinUserId) => {
        return getToken().then((token) => fetch(`${apiUrl}/${warfarinUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`

            },

        }).then(resp => resp.json()));
    };

    const updateRange = (range) => {
        return getToken().then((token) => fetch(`${apiUrl}/${range.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(range)
        })

        )
    };

    // const editRange = (range) => {
    //     getToken().then((token) => fetch(`/api/inrrange/${range.id}`, {
    //         method: "PUT",
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(range)
    //     })
    //     )
    // };

    return (

        <RangeContext.Provider value={{ getRangeByUserId, updateRange }}>
            {props.children}
        </RangeContext.Provider>
    );
}