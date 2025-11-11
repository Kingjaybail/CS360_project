import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* LEFT: links */}
        <ul className="nav-left nav-list">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/library">Library</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>

        {/* CENTER: search */}
        <div className="nav-center">
          <input type="text" id="search" placeholder="Search" />
          <button className="btn" type="button">Search</button>
        </div>

        {/* RIGHT: login */}
        <div className="nav-right">
          <a href="/login" className="btn">Login</a>
        </div>
      </div>
    </nav>
  );
}
