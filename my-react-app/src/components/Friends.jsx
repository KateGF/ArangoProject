import React, { useState, useEffect } from 'react';
import { getFriends, searchFriends, acceptFriendship } from '../api';

function Friends({ userID }) {
    const [friends, setFriends] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    const fetchFriends = async () => {
        try {
            const response = await getFriends(userID);
            setFriends(response.data);
            setError(null);
        } catch (error) {
            setError("Error al cargar amigos. Por favor, inténtalo de nuevo.");
        }
    };

    const handleSearch = async () => {
        try {
            const response = await searchFriends(userID, searchTerm);
            setFriends(response.data);
            setError(null);
        } catch (error) {
            setError("Error al buscar amigos. Por favor, inténtalo de nuevo.");
        }
    };

    const handleAcceptFriendship = async (friendID) => {
        try {
            await acceptFriendship(userID, friendID);
            fetchFriends(); // Refresh the list after accepting
            setError(null);
        } catch (error) {
            setError("Error al aceptar la solicitud de amistad. Por favor, inténtalo de nuevo.");
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    return (
        <div className="App">
            <h1>Friends of User : {userID}</h1>
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search friends"
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {error && <div className="error">{error}</div>}
            {friends.map((friend) => (
                <div key={friend._key}>
                    <span>{friend.username}</span>
                    {friend.status === 'requested' && (
                        <button onClick={() => handleAcceptFriendship(friend._key)}>Accept</button>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Friends;
