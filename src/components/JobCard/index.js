import {Link} from 'react-router-dom'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {FaRupeeSign} from 'react-icons/fa'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData
  return (
    <Link to={`jobs/${id}`} className="link-item">
      <>
        <li className="job-card">
          <div className="job-header">
            <img src={companyLogoUrl} alt="job" className="company-logo" />

            <div className="job-role">
              <h4 className="job-title">{title}</h4>
              <div className="rating">
                <p className="location-title">{rating}</p>
                <BsStarFill />
              </div>
            </div>
          </div>
          <div className="job-info">
            <div className="row-flex">
              <GoLocation />
              <p className="location-title">{location} </p>
            </div>
            <div className="row-flex">
              <BsBriefcaseFill />
              <p className="location-title">{employmentType}</p>
            </div>
            <div className="row-flex last">
              <FaRupeeSign />
              <p className="job-title">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="line" />
          <div className="job-description-section">
            <h1 className="job-description">Description</h1>
            <p className="job-description">{jobDescription}</p>
          </div>
        </li>
      </>
    </Link>
  )
}

export default JobCard
