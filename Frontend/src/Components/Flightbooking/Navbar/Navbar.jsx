const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">makeMyTrip</h2>

      <ul className="nav-links">
        <li><a href="/" target="">Flights</a></li>
        <li>Hotels</li>
        <li>Trains</li>
        <li>Buses</li>
        <li>Cabs</li>
        <li><a href="/Tickets">Tickets</a></li>
      </ul>

      <button className="login-btn"> <a href="/login" target="">Login</a> / <a href="/signup" target="">Signup</a></button>
    </nav>
  );
};

export default Navbar;