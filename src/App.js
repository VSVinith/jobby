import {Route, Switch} from 'react-router-dom'
import AllJobs from './components/AllJobs'
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import JobDetails from './components/JobDetails'
import Home from './components/Home'
import NotFound from './components/NotFound'

import './App.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const App = () => (
  <div className="app-container">
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute
        exact
        path="/jobs"
        component={() => (
          <AllJobs
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
          />
        )}
      />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
      <Route path="/bad-path" component={NotFound} />
      <NotFound />
    </Switch>
  </div>
)

export default App
