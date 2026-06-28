import { useState } from "react";
import Navbar from "../Component/Navbar";
import RoomModal from "../Component/RoomModal";
import RoomCard from "../Component/RoomCard";

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);

  const [rooms, setRooms] = useState([]);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function createRoom(roomName) {
    const today = new Date().toLocaleDateString();

    setRooms((prevRooms) => [
      ...prevRooms,
      {
        name: roomName,
        date: today,
      },
    ]);
  }

  return (
    <>
      <Navbar openModal={openModal} />

      <section className="home text-center container">
        <div className="custom-badge">Real-time Collaboration Made Simple</div>

        <h1>
          Learn and Code <br />
          <span className="text">Together in Real-time</span>
        </h1>

        <p>
          Synapse combines instant whiteboard sketching, live code editing, and
          AI-powered assistance into one seamless platform.
        </p>

        <div className="buttons">
          <button className="btn-1" onClick={openModal}>
            Create a Room
          </button>

          <a href="#cards">
            <button className="btn-2 m-3">Explore Features</button>
          </a>
        </div>
      </section>

      <section className="container py-5" id="cards">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="custom-card">
              <div className="icon">✏️</div>
              <h3>Shared Whiteboard</h3>
              <p>Draw, sketch, and visualize ideas together in real-time.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="custom-card">
              <div className="icon">💻</div>
              <h3>Live Code Editor</h3>
              <p>Write and debug code together with instant sync.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="custom-card">
              <div className="icon">⚡</div>
              <h3>AI Assistance</h3>
              <p>Get instant code reviews and smart suggestions.</p>
            </div>
          </div>
        </div>
      </section>

      <RoomModal
        showModal={showModal}
        closeModal={closeModal}
        createRoom={createRoom}
      />

      <section className="container py-5">
        <h2 className="text-white mb-4">Available Rooms</h2>

        <div className="row g-4">
          {rooms.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </div>
      </section>
    </>
  );
}
