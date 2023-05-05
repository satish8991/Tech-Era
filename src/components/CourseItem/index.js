import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {details} = props
  const {id, logoUrl, name} = details
  return (
    <Link to={`/courses/${id}`} className="link-item">
      <li className="list-item">
        <img src={logoUrl} className="logo" alt={name} />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
