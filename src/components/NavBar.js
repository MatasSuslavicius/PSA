import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
      <nav className="navbar">
        <h1>Atostogų planavimas Lietuvoje</h1>
        <div className="links">
          <Link to="/">Atgal į pradžią</Link>
        </div>
      </nav>
    );
  }
   
  export default NavBar;