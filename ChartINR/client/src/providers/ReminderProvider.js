import React, { useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const ReminderContext = React.createContext();

export function ReminderProvider(props) {
    const apiUrl = "/api/reminder"
    const { getToken } = useContext(UserProfileContext)

    const getMostRecentReminder = (warfarinUserId) => {
        return getToken().then((token) => fetch(`${apiUrl}/mostrecent/${warfarinUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },

        }).then((resp) => {
            return resp.status === 200 && resp.json()
        }));
    };

    const deleteReminder = (id) => {
        return getToken().then((token) => fetch(`${apiUrl}/delete/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }

        })
        )
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

        <ReminderContext.Provider value={{ getMostRecentReminder, addReminder, deleteReminder }}>
            {props.children}
        </ReminderContext.Provider>
    );
}