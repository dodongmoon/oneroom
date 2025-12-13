import { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Connect to Backend (Railway URL or Localhost)
const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function useRooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // 1. Connect Socket
        const newSocket = io(SOCKET_URL);
        setSocket(newSocket);

        // 2. Listen for Initial Data
        newSocket.on('initial_data', (data) => {
            setRooms(data);
            setLoading(false);
        });

        // 3. Listen for Updates
        newSocket.on('room_updated', (updatedRoom) => {
            setRooms(prev => prev.map(room =>
                room.id === updatedRoom.id ? updatedRoom : room
            ));
        });

        // Cleanup
        return () => newSocket.close();
    }, []);

    // 4. Update Function
    const updateRoomStatus = (roomId, newStatus) => {
        if (!socket) return;

        // Optimistic Update
        setRooms(prev => prev.map(r =>
            r.id === roomId ? { ...r, status: newStatus } : r
        ));

        // Emit Event
        socket.emit('update_room', { id: roomId, status: newStatus });
    };

    return { rooms, loading, updateRoomStatus };
}
