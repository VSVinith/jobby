import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import JobCard from '../JobCard'
import ProfileCard from '../ProfileCard'
import Header from '../Header'
import FiltersSection from '../FiltersSection'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    name: '',
    profileImageUrl: '',
    shortBio: '',
    activeEmploymentTypeId: [],
    activeSalaryRangeId: '',
    searchInput: '',
    isChecked: {
      PARTTIME: false,
      FULLTIME: false,
      FREELANCE: false,
      INTERNSHIP: false,
    },
  }

  componentDidMount() {
    this.getJobs()
    this.getProfileData()
  }

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        name: updatedData.name,
        profileImageUrl: updatedData.profileImageUrl,
        shortBio: updatedData.shortBio,
      })
    }
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {
      activeEmploymentTypeId,
      activeSalaryRangeId,
      searchInput,
    } = this.state
    // const employmentParam = activeEmploymentTypeId.join()
    console.log(activeEmploymentTypeId)

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentTypeId}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        id: job.id,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeEmploymentType = id => {
    this.setState({activeEmploymentTypeId: id}, this.getJobs)
  }

  changeSalaryRange = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobs)
  }

  enterSearchInput = () => {
    this.getJobs()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.enterSearchInput()
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  clearFilters = () => {
    this.setState(
      {
        searchInput: '',
        activeEmploymentTypeId: '',
        activeSalaryRangeId: '',
      },
      this.getJobs,
    )
  }

  renderFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="job-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={this.clearFilters}>
        Retry
      </button>
    </div>
  )

  renderJobsListView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <div className="all-jobs">
        <div className="job-cards">
          <ul className="jobs-list">
            {jobsList.map(job => (
              <JobCard jobData={job} key={job.id} />
            ))}
          </ul>
        </div>
      </div>
    ) : (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="">No Jobs Found</h1>
        <p className="">We could not find any Jobs. Try other filters.</p>
        <button type="button" onClick={this.clearFilters}>
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div testid="loader" className="jobs-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {
      name,
      shortBio,
      profileImageUrl,
      activeEmploymentTypeId,
      isChecked,
      employmentTypes,
    } = this.state
    const {employmentTypesList, salaryRangesList} = this.props

    return (
      <div className="">
        <Header />
        <div className="flex-row">
          <div className="profile-filters">
            <ProfileCard
              name={name}
              shortBio={shortBio}
              profileImageUrl={profileImageUrl}
            />
            <hr className="line" />
            <FiltersSection
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeSalaryRange={this.changeSalaryRange}
              changeEmploymentType={this.changeEmploymentType}
              activeEmploymentTypeId={activeEmploymentTypeId}
              isChecked={isChecked}
              employmentTypes={employmentTypes}
            />
          </div>
          <div className="flex-column">
            <div className="">
              <input
                type="search"
                className="search-bar"
                onChange={this.changeSearchInput}
                onKeyDown={this.onEnterSearchInput}
                placeholder="search"
              />
              <button
                type="button"
                onClick={this.getJobs}
                testid="searchButton"
              >
                <BsSearch />
              </button>
            </div>

            {this.renderAllJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default AllJobs
