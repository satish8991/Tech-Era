import {Component} from 'react'

import Loader from 'react-loader-spinner'

import NavBar from '../NavBar'

import CourseItem from '../CourseItem'

import FailureView from '../FailureView'

import './index.css'

const apiStatusContants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {apiStatus: apiStatusContants.initial, coursesList: []}

  componentDidMount() {
    this.getCourserList()
  }

  getCourserList = async () => {
    this.setState({apiStatus: apiStatusContants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses/'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(each => ({
        logoUrl: each.logo_url,
        name: each.name,
        id: each.id,
      }))
      this.setState({
        apiStatus: apiStatusContants.success,
        coursesList: updatedData,
      })
    }
  }

  renderInProgressView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <ul className="courses-list-container">
        {coursesList.map(each => (
          <CourseItem details={each} key={each.id} />
        ))}
      </ul>
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
        <div className="home-container">
          <h1 className="heading">Courses</h1>
          {this.renderFinalView()}
        </div>
      </div>
    )
  }
}

export default Home
