import { useState } from 'react'
import '../WorkspaceNavbar.css'
import { useNavigate } from "react-router-dom";
import { LogIn , LogOut } from 'lucide-react';

export default function WorkspaceNavbar() {
  const [activeLayout, setActiveLayout] = useState('grid')
  const navigate = useNavigate();
  return (
    <nav className="workspace-navbar sticky-top">
      <div className="container-fluid d-flex align-items-center">
        {/* Logo */}
        <div
          className="d-flex align-items-center gap-2 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <span className="logo-badge">✦</span>
          <span className="app-name">Synapse</span>
        </div>

        {/* Room Info */}
        <div className="d-flex align-items-center gap-2 room-info">
          <span className="status-dot" />
          <span className="room-name">Room Name</span>
        </div>

        {/* Controls on the right */}
        <div className="d-flex align-items-center gap-2 ms-auto">
          {/* Attendee Counter */}
          <div className="control-item d-flex align-items-center gap-2 rounded-pill">
            <i className="fa-solid fa-user-group" />
            <span>4 in the room</span>
          </div>

          {/* User Menu */}
          <div className="dropdown">
            <button
              className="control-item user-menu d-flex align-items-center gap-2 rounded-pill border-0 bg-transparent"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="user-avatar">MS</span>
              <span className="user-name">UserName</span>
              <i className="fa-solid fa-chevron-down" />
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
           
              <li>
                <button className="dropdown-item"><LogIn/> Login</button>
              </li>

              <li>
                <button className="dropdown-item text-danger"><LogOut/> Logout</button>
              </li>
            </ul>
          </div>

          {/* Connection Status */}
          <div className="control-item d-flex align-items-center gap-2 rounded-pill offline-connection-status">
            <span className="offline-dot" />
            <i className="fa-solid fa-wifi" />
            <span>offline</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
