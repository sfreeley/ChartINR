import React, { useContext, useState, } from "react";
import { useHistory } from "react-router-dom";
import { Card, Toast, ToastHeader, ToastBody, Button } from "reactstrap";
import { currentDate } from "../Helper/HelperFunctions";


const Level = ({ level, hidden }) => {

    console.log(level)
    return (
        <>
            <Toast className="levelToast" hidden={hidden} >
                <ToastHeader>
                    Logged on: <strong>{currentDate(level.dateDrawn)}</strong>
                    <p> Weekly Dose: {level.dose.weeklyDose}</p>
                </ToastHeader>

                <ToastBody>
                    <p>Result: <strong>{level.result.toFixed(1)}</strong></p>
                    <p>In Range: {level.inRange === 0 ? <p>No</p> : <p>Yes</p>}</p>
                    <hr />
                    {level.comment !== null ?
                        <p>Comments: {level.comment}</p> : null}
                </ToastBody>


                <div className="levelsButtonContainer">
                    {/* need to edit with modal */}
                    <Button className="levelsEdit--button" outline >Edit </Button>
                </div>


            </Toast>

        </>
    );
}

export default Level;