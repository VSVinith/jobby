import './index.css'

const SimilarProductItem = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    employmentType,
    rating,
    jobDescription,
    location,
  } = jobDetails

  return (
    <li className="similar-job-item">
      <div className="flex-row">
        <img
          src={companyLogoUrl}
          className="similar-job-image"
          alt="similar job company logo"
        />
        <div>
          <h1 className="similar-job-title">{title}</h1>
          <p className="">{rating}</p>
        </div>
      </div>
      <h4 className="description">Description</h4>
      <p className="job-description">{jobDescription}</p>
      <p className="job-description">{location}</p>
      <p className="job-description">{employmentType}</p>
    </li>
  )
}

export default SimilarProductItem
