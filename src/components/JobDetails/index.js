import {Component} from 'react'
import Cookies from 'js-cookie'
// import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {FaRupeeSign} from 'react-icons/fa'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    skills: data.skills,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
    similarJobs: data.similar_jobs,
    name: data.name,
    lifeAtCompany: data.life_at_company,
    packagePerAnnum: data.package_per_annum,
    imageUrl: data.image_url,
  })

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      //   console.log(fetchedData)
      const updatedData = this.getFormattedData(fetchedData.job_details)
      //   console.log(updatedData)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getFormattedData(eachSimilarJob),
      )
      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="jobs-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="job-details-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="error-view-image"
      />
      <h1 className="">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="button" onClick={this.getJobData}>
        Retry
      </button>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      jobDescription,
      packagePerAnnum,
      employmentType,
      companyWebsiteUrl,
      rating,
      title,
      skills,
      location,
      lifeAtCompany,
    } = jobData

    return (
      <div>
        <Header />
        <div className="job-details-section">
          <div className="job-details">
            <img src={companyLogoUrl} alt="job details company logo" />
            <div className="job-header-section">
              <h1 className="">{title}</h1>
              <div className="rating">
                <p className="zero-top-margin">{rating}</p>
                <BsStarFill />
              </div>
            </div>
          </div>
          <hr />
          <div className="location-salary">
            <div className="row-flex">
              <GoLocation />
              <p className="zero-top-margin">{location}</p>
            </div>
            <div className="row-flex">
              <BsBriefcaseFill />
              <p className="zero-top-margin">{employmentType}</p>
            </div>
            <div className="row-flex">
              <FaRupeeSign />
              <p className="zero-top-margin">{packagePerAnnum}</p>
            </div>
            <a href={companyWebsiteUrl} target="blank">
              Visit
            </a>
          </div>
          <hr />
          <div className="">
            <div className="flex-row">
              <h1 className="">Description</h1>
            </div>
            <p className="">{jobDescription}</p>
            <h1 className="">Skills</h1>
            <ul className="flex-row">
              {skills.map(skill => (
                <li>
                  <img
                    className="skill-image"
                    src={skill.image_url}
                    alt={skill.name}
                    key={skill.name}
                  />
                  <p className="">{skill.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="">Life at Company</h1>
            <div className="flex-row">
              <p className="">{lifeAtCompany.description}</p>
              <img src={lifeAtCompany.image_url} alt="life at company" />
            </div>
          </div>
        </div>

        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobs jobDetails={eachSimilarJob} key={eachSimilarJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobDetails
