import React, { useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ReminderContext = React.createContext();

export function ReminderProvider(props) {
    const apiUrl = "/api/reminder"
    const { getToken } = useContext(UserProfileContext)


    // const getReminders = (userProfileId) => {
    //     return getToken().then((token) => fetch(`${apiUrl}/userprofile/${userProfileId}`, {
    //         method: "GET",
    //         headers: {
    //             Authorization: `Bearer ${token}`

    //         },

    //     }).then(resp => resp.json()).then(setReminders)

    //     )
    // };

    const getMostRecentReminder = (warfarinUserId) => {
        return getToken().then((token) => fetch(`${apiUrl}/${warfarinUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },

        }).then(resp => {
            resp.text()
                .then((text) => {
                    text ? JSON.parse(text) : null
                })
        }));
    };

    const addReminder = (reminder) => {
        return getToken().then((token) => fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(reminder)
        })

        )
    };

    return (

        <ReminderContext.Provider value={{ getMostRecentReminder, addReminder }}>
            {props.children}
        </ReminderContext.Provider>
    );
}