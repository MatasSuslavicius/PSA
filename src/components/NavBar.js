import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
      <nav className="navbar">
        <h1>Test</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/comments">Komentarai</Link>
        </div>
      </nav>
    );
  }
   
  export default NavBar;