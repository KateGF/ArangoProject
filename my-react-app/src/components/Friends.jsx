import React, { useState, useEffect } from 'react';
import { getFriends, searchFriends, acceptFriendship, addFriend } from '../api';

function Friends({ userID }) {
    const [friends, setFriends] = useState(null);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [newFriendUsername, setNewFriendUsername] = useState('');

    const fetchFriends = async () => {
        try {
            const response = await searchFriends(userID);
    
            if (response ) {
                console.log(response); // Aquí puedes ver los datos
                setFriends(response);
                setError(null);
            } else {
                setError("Error al cargar amigos. Por favor, inténtalo de nuevo.");
            }
        } catch (error) {
            setError("Error al cargar amigos. Por favor, inténtalo de nuevo.");
        }
    };
    

   

    const handleAddFriend = async () => {
        try {
            console.log("intente a;adir");
            await addFriend(userID, newFriendUsername);
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
    
            {friends && friends.map((friend) => (
    <div key={friend.id}>
        <span>{friend.user}</span>
        {friend.status === 'requested' && (
            <button
                className="bg-green float-right text-white rounded-md py-1 px-2"
                onClick={() => handleAcceptFriendship(friend._key)}
            >
                Accept
            </button>
        )}
    </div>
))}
    
    
            <hr />
    
            <div className="py-20">
                <input
                    type="text"
                    value={newFriendUsername}
                    onChange={(e) => setNewFriendUsername(e.target.value)}
                    placeholder="Username of Friend"
                />
                <button
                    className="bg-blue-500 text-white rounded-md py-1 px-2"
                    onClick={handleAddFriend}
                >
                    Add Friend
                </button>
            </div>
        </div>
    );
}

export default Friends;
