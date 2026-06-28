import { useState } from "react";

export default function RoomModal({ showModal, closeModal, createRoom }) {
  const [roomName, setRoomName] = useState("");

  if (!showModal) return null;

  function handleCreate() {
    if (roomName.trim() === "") {
      alert("Enter room name");
      return;
    }

    createRoom(roomName);
    setRoomName("");
    closeModal();
  }

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Room</h2>

        <label className="label">Room Name</label>

        <input
          type="text"
          placeholder="Ex: HTML Study Room"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />

        <div className="modal-buttons">
          <button className="create" onClick={handleCreate}>
            Create New Room
          </button>

          <button className="cancel" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
