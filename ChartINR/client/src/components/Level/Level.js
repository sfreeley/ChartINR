import React, { useContext, useState, } from "react";
import { useHistory } from "react-router-dom";
import { Card } from "reactstrap";
// import { currentDateAndTime } from "../helperFunctions";


const Level = ({ level }) => {

    console.log(level)
    return (
        <>

            <Card>
                {level.result}
                {/* {level.dateDrawn} */}
            </Card>


        </>
    );
}

export default Level;