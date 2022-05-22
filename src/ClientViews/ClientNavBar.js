import { Link } from 'react-router-dom'

const ClientNavBar = () => {
    return (
      <nav className="navbar">
        <div className='navLeft'>
          <div className='navbarTitleWrapper'>
            <h1 className='navbarTitle'>Atostogų<br/>planavimas<br/>Lietuvoje</h1>
          </div>
        </div>

        <div>
          <Link to="/clientRoutes">
            <h1 style={{marginRight: 40}} className='navbarTitle'>Jūsų maršrutai</h1>
          </Link>
          <Link to="/">
            <h1 className='navbarTitle'>Atgal į pradžią</h1>
          </Link>
        </div>
      </nav>
    );
  }
   
  export default ClientNavBar;