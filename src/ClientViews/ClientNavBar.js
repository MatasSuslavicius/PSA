import { Link } from 'react-router-dom'

const ClientNavBar = () => {
    return (
      <nav className="navbar">
        <h1>Test</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/rateGuide">ĮvertintiGidą(turi buti marsrute)</Link>
        </div>
      </nav>
    );
  }
   
  export default ClientNavBar;