import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
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
            {/* add form to add new warfarin user */}
            <Link to={"/user/add"}>Add New Warfarin User</Link>
            <CardDeck className="warfarinUserList--container">

                {warfarinUsers.map((warfarinUser) => {
                    return <WarfarinUser key={warfarinUser.id} warfarinUser={warfarinUser} />
                })}

            </CardDeck>

        </div>

    )
}
export default WarfarinUserList;