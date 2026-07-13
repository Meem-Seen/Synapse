import { useEffect, useState } from "react";
import { useAuth } from "../Component/AuthContext";
import Navbar from "../Component/Navbar";
import RoomModal from "../Component/RoomModal";
import RoomCard from "../Component/RoomCard";
import AuthModal from "../Component/AuthModal";
import ShapeGrid from "../Component/ShapeGrid/ShapeGrid";
import { Pencil, Code2, Sparkles } from "lucide-react";
import { getRooms, createRoom as apiCreateRoom } from '../api'
export default function HomePage() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [rooms, setRooms] = useState([])

  useEffect(() => {
  getRooms().then(setRooms).catch(console.error)
  }, [])
  function handleCreateRoomClick() {
    if (user) {
      setShowModal(true);
    } else {
      setIsAuthOpen(true);
    }
  }

  function handleAuthSuccess() {
    setIsAuthOpen(false);
  }

  function closeModal() {
    setShowModal(false);
  }
    async function createRoom(roomName) {
      const newRoom = await apiCreateRoom(roomName)
      setRooms((prev) => [newRoom, ...prev])
    }
  return (
    <>
      <Navbar openModal={handleCreateRoomClick} />

      <div className="position-relative">
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -1,
          }}
        >
          <ShapeGrid
            speed={0.5}
            squareSize={40}
            direction="diagonal"
            borderColor="#2F293A"
            hoverFillColor="#222"
            shape="square"
            hoverTrailAmount={0}
          />
        </div>

        {/* Hero */}

        <section className="home text-center container">
          <div className="custom-badge">
            Real-time Collaboration Made Simple
          </div>

          <h1>
            Learn and Code <br />
            <span className="text">Together in Real-time</span>
          </h1>

          <p>
            Synapse combines instant whiteboard sketching, live code editing,
            and AI-powered assistance into one seamless platform.
          </p>

          <div className="buttons">
            <button className="btn-1" onClick={handleCreateRoomClick}>
              Create a Room
            </button>

            <a href="#cards">
              <button className="btn-2 m-3">
                Explore Features
              </button>
            </a>
          </div>
        </section>

        {/* Features */}

        <section className="container py-5" id="cards">
          <div className="row g-4">

            <div className="col-md-4">
              <div className="custom-card">

                <div className="card-title">
                  <Pencil size={30} />
                  <h3>Shared Whiteboard</h3>
                </div>

                <p>
                  Draw, sketch, and visualize ideas together in real-time.Collaborate seamlessly with teammates on an interactive shared whiteboard.
                </p>

              </div>
            </div>

            <div className="col-md-4">
              <div className="custom-card">

                <div className="card-title">
                  <Code2 size={30} />
                  <h3>Live Code Editor</h3>
                </div>

                <p>
                  Write and debug code together with instant sync.Collaborate with your team in a powerful real-time coding environment.
                </p>

              </div>
            </div>

            <div className="col-md-4">
              <div className="custom-card">

                <div className="card-title">
                  <Sparkles size={30} />
                  <h3>AI Assistance</h3>
                </div>

                <p>
                  Receive intelligent code suggestions, instant reviews, and AI-powered assistance to improve productivity and accelerate development.
                </p>

              </div>
            </div>

          </div>
        </section>

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onJoinSuccess={handleAuthSuccess}
        />

        <RoomModal
          showModal={showModal}
          closeModal={closeModal}
          createRoom={createRoom}
        />

        <section className="container py-5">
          <h2 className="text-white mb-4">
            Available Rooms
          </h2>

          <div className="row g-4">
            {rooms.map((room, index) => (
              <RoomCard key={index} room={room} />
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
