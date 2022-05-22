import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
      <nav className="navbar">
        <div className='navLeft'>
          <div className='navbarTitleWrapper'>
            <h1 className='navbarTitle'>Atostogų<br/>planavimas<br/>Lietuvoje</h1>
          </div>
        </div>

        <div>
          <Link to="/">
            <h1 className='navbarTitle'>Atgal į pradžią</h1>
          </Link>
        </div>
      </nav>
    );
  }
   
  export default NavBar;