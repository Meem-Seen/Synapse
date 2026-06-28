export default function Navbar({ openModal }) {
  return (
    <nav className="navbar fixed-top custom-navbar">
      <div className="container d-flex justify-content-between">

        <div className="logo text-white">
          <span>✦</span>Synapse
        </div>

        <button className="custom-btn" onClick={openModal}>
          + New Room
        </button>

      </div>
    </nav>
  );
}