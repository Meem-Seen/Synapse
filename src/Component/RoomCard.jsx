import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { joinRoom } from "../api";

export default function RoomCard({ room }) {
  const navigate = useNavigate();

  return (
    <div className="col-md-4">
      <div className="room-card">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="m-0">{room.name}</h3>

          <div className="d-flex align-items-center gap-1">
            <FaUsers />
            <span>{room.member_count ?? 0}</span>
          </div>
        </div>
        <p>A new collaborative learning room</p>

        <p>{room.created_at ? new Date(room.created_at).toLocaleDateString() : ""}</p>

        <button
          className="custom-btn w-100"
          onClick={async () => {
            await joinRoom(room.id);
            navigate("/workspace/" + room.id);
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
}
