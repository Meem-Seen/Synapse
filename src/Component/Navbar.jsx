import { useState, useRef, useEffect } from "react";
import { useAuth } from "./AuthContext";

export default function Navbar({ openModal }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // قفل المنيو لو حد دوس بره الأيقونة
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar fixed-top custom-navbar">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="logo text-white">
          <span>✦</span>Synapse
        </div>

        <div className="d-flex align-items-center gap-3">
          {user && (
            <div className="position-relative" ref={menuRef}>
              <button
                type="button"
                className="btn d-flex align-items-center gap-2 border-0 bg-transparent text-white p-0"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <span
                  className="d-flex align-items-center justify-content-center rounded-circle fw-bold text-white"
                  style={{ width: 32, height: 32, backgroundColor: "#4f46e5", fontSize: 14 }}
                >
                 {user.user_metadata?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                </span>
                <span className="fw-semibold">{user.user_metadata?.full_name || user.email}</span>
              </button>

              {menuOpen && (
                <div
                  className="position-absolute end-0 mt-2 rounded-3 shadow-lg overflow-hidden"
                  style={{ backgroundColor: "#12172b", minWidth: 140, zIndex: 10 }}
                >
                  <button
                    type="button"
                    className="btn w-100 text-start text-white rounded-0 px-3 py-2"
                    style={{ fontSize: 14 }}
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}

          <button className="custom-btn" onClick={openModal}>
            + New Room
          </button>
        </div>
      </div>
    </nav>
  );
}