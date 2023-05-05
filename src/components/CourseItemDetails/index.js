import {Component} from 'react'

import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'

import FailureView from '../FailureView'

import './index.css'

const apiStatusContants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {apiStatus: apiStatusContants.initial, courseDetails: {}}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusContants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const courseDetails = data.course_details
      const updatedData = {
        imageUrl: courseDetails.image_url,
        description: courseDetails.description,
        id: courseDetails.id,
        name: courseDetails.name,
      }
      this.setState({
        apiStatus: apiStatusContants.success,
        courseDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusContants.failure})
    }
  }

  renderInProgressView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {courseDetails} = this.state
    const {description, imageUrl, name} = courseDetails
    return (
      <div className="course-details-container">
        <img src={imageUrl} alt={name} className="detailed-image" />
        <div className="description-container">
          <h1 className="name">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => <FailureView />

  renderFinalView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContants.inProgress:
        return this.renderInProgressView()
      case apiStatusContants.failure:
        return this.renderFailureView()
      case apiStatusContants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="container">
        <NavBar />
        {this.renderFinalView()}
      </div>
    )
  }
}

export default CourseItemDetails
