import { Link } from 'react-router-dom'

const GuideNavBar = () => {
    return (
      <nav className="navbar">
        <h1>Test</h1>
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/guideProfile">Profilis</Link>
          <Link to="/guideRate">Jūsų įvertinimas</Link>
          <Link to="/guideRoutes">Maršrutai</Link>
        </div>
      </nav>
    );
  }
   
  export default GuideNavBar;