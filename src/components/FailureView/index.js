import {Link} from 'react-router-dom'

import './index.css'

const FailureView = () => (
  <div className="failure-view-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
      className="failure-view-image"
      alt="failure view"
    />
    <h1 className="heading">Oops! Something Went Wrong</h1>
    <p className="para">We cannot seem to find the page you are looking for</p>
    <Link to="/courses/:id">
      <button type="button" className="retry-button">
        Retry
      </button>
    </Link>
  </div>
)

export default FailureView
