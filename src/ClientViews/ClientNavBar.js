import { Link } from 'react-router-dom'

const ClientNavBar = () => {
    return (
      <nav className="navbar">
        <h1>Atostogų planavimas Lietuvoje</h1>
        <div className="links">
          <Link to="/">Atgal į pradžią   </Link>
          <Link to="/clientRoutes">Jūsų maršrutai</Link>
          <Link to="/rateGuide">ĮvertintiGidąTIDI</Link>
        </div>
      </nav>
    );
  }
   
  export default ClientNavBar;