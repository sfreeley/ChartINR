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
                </ToastHeader>

                <ToastBody>
                    <p>Result: <strong>{level.result.toFixed(1)}</strong></p>
                    <p>In Range: {level.inRange === 0 ? <p>No</p> : <p>Yes</p>}</p>
                </ToastBody>


                {/* 
                <div className="commentButtonContainer">
                    <Button className="commentEdit--button" onClick={() => history.push(`/comment/edit/${aComment.id}`)} outline >Edit </Button>
                    <Button className="commentDelete--button" outline onClick={toggle}>Delete</Button>
                </div> : null */}


            </Toast>

        </>
    );
}

export default Level;