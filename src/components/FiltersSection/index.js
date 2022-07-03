import './index.css'

const FiltersSection = props => {
  const employmentTypesSection = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(type => {
      const {changeEmploymentType} = props
      const onClickType = () => changeEmploymentType(type.employmentTypeId)

      return (
        <ul className="filters-section">
          <input
            type="radio"
            onChange={onClickType}
            id={type.employmentTypeId}
            name="employment-type"
            key={type.employmentTypeId}
          />
          <label htmlFor={type.employmentTypeId}>{type.label}</label>
        </ul>
      )
    })
  }

  const renderEmploymentTypesSection = () => (
    <>
      <h1 className="heading">Type of Employment</h1>
      <div className="employment-type-list">{employmentTypesSection()}</div>
    </>
  )

  const salaryRangesSection = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(range => {
      const {changeSalaryRange} = props
      const onClickSalary = () => changeSalaryRange(range.salaryRangeId)

      return (
        <ul className="filters-section">
          <input
            type="radio"
            onChange={onClickSalary}
            id={range.salaryRangeId}
            name="salary"
            key={range.salaryRangeId}
          />
          <label htmlFor={range.salaryRangeId}>{range.label}</label>
        </ul>
      )
    })
  }

  const renderSalaryRangesSection = () => (
    <>
      <h1 className="heading">Salary Range</h1>
      <div className="">{salaryRangesSection()}</div>
    </>
  )

  return (
    <div className="">
      {renderEmploymentTypesSection()}
      {renderSalaryRangesSection()}
    </div>
  )
}

export default FiltersSection
