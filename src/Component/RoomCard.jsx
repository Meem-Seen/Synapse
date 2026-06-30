import React from 'react';
import { useNavigate } from 'react-router-dom'; 

export default function RoomCard({ room }) {

  const navigate = useNavigate();
  
  return (
    <div className="col-md-4">
      <div className="room-card">
        <h3>{room.name}</h3>

        <p>A new collaborative learning room</p>

        <p>{room.date}</p>

        <button
          className="custom-btn w-100"
          onClick={() => {
            navigate('/workspace');
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
}
