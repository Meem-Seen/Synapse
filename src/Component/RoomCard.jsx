export default function RoomCard({ room }) {
  return (
    <div className="col-md-4">
      <div className="room-card">
        <h3>{room.name}</h3>

        <p>A new collaborative learning room</p>

        <p>{room.date}</p>

        <button
          className="custom-btn w-100"
          onClick={() => {
            alert(`Joining ${room.name}`);
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
}
