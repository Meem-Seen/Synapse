import { useState, useEffect } from "react";
import "../WorkspaceNavbar.css";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "./AuthContext";
import { getRoom } from "../api";

export default function WorkspaceNavbar({ roomId }) {
  const [room, setRoom] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (roomId) getRoom(roomId).then(setRoom).catch(console.error);
  }, [roomId]);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return (
    <nav className="workspace-navbar sticky-top">
      <div className="container-fluid d-flex align-items-center">
        {/* Logo */}
        <div
          className="d-flex align-items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="logo-badge">✦</span>
          <span className="app-name">Synapse</span>
        </div>

        {/* Room Info */}
        <div className="d-flex align-items-center gap-2 room-info">
          <span className="status-dot" />
          <span className="room-name">{room?.name ?? "Loading..."}</span>
        </div>

        {/* Controls on the right */}
        <div className="d-flex align-items-center gap-2 ms-auto">
          {/* Attendee Counter */}
          <div className="control-item d-flex align-items-center gap-2 rounded-pill">
            <i className="fa-solid fa-user-group" />
            <span>{room?.member_count ?? 0} in the room</span>
          </div>

          {/* User Menu */}
          <div className="dropdown">
            <button
              className="control-item user-menu d-flex align-items-center gap-2 rounded-pill border-0 bg-transparent"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="user-avatar">
                {user?.user_metadata?.full_name?.[0]?.toUpperCase() ||
                  user?.email?.[0]?.toUpperCase() ||
                  "?"}
              </span>
              <span className="user-name">
                {user?.user_metadata?.full_name || user?.email || "Guest"}
              </span>
              <i className="fa-solid fa-chevron-down" />
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              {user && (
                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => {
                     logout();
                      navigate("/");
                    }}
                  >
                    <LogOut /> Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
          {/* Connection Status */}
          <div className={`control-item d-flex align-items-center gap-2 rounded-pill ${isOnline ? "online-connection-status" : "offline-connection-status"}`}>
            <span className={isOnline ? "online-dot" : "offline-dot"} />
            <i className="fa-solid fa-wifi" />
            <span>{isOnline ? "online" : "offline"}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
