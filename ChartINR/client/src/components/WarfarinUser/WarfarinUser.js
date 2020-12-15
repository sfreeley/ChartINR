import React, { useContext, useState, } from "react";
import { useHistory } from "react-router-dom";
import { Card, Toast, ToastHeader, Button } from "reactstrap";


const WarfarinUser = ({ warfarinUser }) => {
    const history = useHistory()
    return (
        <>
            <Toast className="warfarinUserToast">
                <ToastHeader>
                    User: <strong>{warfarinUser.displayName}</strong>
                </ToastHeader>

                <div className="warfarinUsersButtonContainer">
                    {/* need to edit with modal */}
                    <Button className="warfarinUsersEdit--button" outline onClick={() => history.push(`/user/profile/${warfarinUser.id}`)}>See Profile </Button>
                </div>


            </Toast>

        </>
    );
}

export default WarfarinUser;