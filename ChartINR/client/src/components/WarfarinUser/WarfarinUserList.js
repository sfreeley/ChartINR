import React, { useContext, useEffect } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { WarfarinUserContext } from "../../providers/WarfarinUserProvider";
import { CardDeck, Button } from "reactstrap";
import WarfarinUser from "./WarfarinUser";




const WarfarinUserList = () => {

    const { getWarfarinUsers, warfarinUsers } = useContext(WarfarinUserContext);
    const { activeUser } = useContext(UserProfileContext);

    useEffect(() => {
        getWarfarinUsers(parseInt(activeUser.id));
    }, []);


    return (
        <div className="warfarinUserList">
            {/* show most recent INR level */}
            <Button className="">INR History</Button>
            {/* push user to new view with chart/graph? and stats?*/}
            <Button className="">See INR Trends</Button>
            {/* ability to add INR not related to reminder date... how to approach this?  */}
            <Button className="">Add INR Level</Button>
            <CardDeck className="warfarinUserList--container">

                {warfarinUsers.map((warfarinUser) => {
                    return <WarfarinUser key={warfarinUser.id} warfarinUser={warfarinUser} />
                })}

            </CardDeck>

        </div>

    )
}
export default WarfarinUserList;