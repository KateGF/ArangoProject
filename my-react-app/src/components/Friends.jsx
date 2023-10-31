import React, { useState, useEffect } from 'react';
import { getFriends } from '../api';

function Friends({ userID }) {

    const [friends, setFriends] = useState([]);


    const [error, setError] = useState(null);

    const fetchFriends = async () => {
        try {
            const response = await getFriends(userID);
            setFriends(response.data);
            setError(null);
        } catch (error) {
            setError("Error al cargar amigos. Por favor, inténtalo de nuevo.")
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    return (

        <div className="App ">
            <h1>Friends of User : {userID}</h1>
            {error && <div className="error">{error}</div>}
            {friends.map((friend) => (
                <div key={friend._key}>
                    <span>{friend}</span>
                </div>
            ))}
        </div>
    )
}
export default Friends;