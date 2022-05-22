import { Link } from 'react-router-dom'

const GuideNavBar = () => {


  return (
    <nav className="navbar">
      <div className='navLeft'>
        <div className='navbarTitleWrapper'>
          <h1 className='navbarTitle'>Atostogų<br />planavimas<br />Lietuvoje</h1>
        </div>
      </div>

      <div>
        <Link to="/guideProfile">
          <h1 style={{ marginRight: 40 }} className='navbarTitle'>Profilis</h1>
        </Link>
        <Link to="/guideRate">
          <h1 style={{ marginRight: 40 }} className='navbarTitle'>Jūsų įvertinimas</h1>
        </Link>
        <Link to="/guideRoutes">
          <h1 style={{ marginRight: 40 }} className='navbarTitle'>Maršrutai</h1>
        </Link>
        <Link to="/">
          <h1 className='navbarTitle'>Atgal į pradžią</h1>
        </Link>
      </div>
    </nav>
  );
}

export default GuideNavBar;