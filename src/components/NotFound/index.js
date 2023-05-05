import NavBar from '../NavBar'

import './index.css'

const NotFound = () => (
  <div className="container">
    <NavBar />
    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      className="not-found-image"
      alt="not found"
    />
    <h1 className="heading">Page Not Found</h1>
    <p className="para">
      We are sorry, the page you requested could not be found.
    </p>
  </div>
)

export default NotFound
