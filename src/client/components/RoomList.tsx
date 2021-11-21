import { useQuery, gql } from "@apollo/client";
import React from "react";

const ALL_ROOMS_QUERY = gql`
query getAllRooms {
    allRooms {
        _id
    }
}

`;

const RoomList = () => {
    const { data } = useQuery(ALL_ROOMS_QUERY);

    return (
        <div>
            {data && (
                <>
                    {data.allRooms.map(room => <p key={room._id}>{room._id}</p>)}
                </>
            )}
        </div>
    )
}

export default RoomList;