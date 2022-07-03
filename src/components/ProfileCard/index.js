import './index.css'

const ProfileCard = props => {
  const {shortBio, name, profileImageUrl} = props
  return (
    <div className="profile-card">
      <img src={profileImageUrl} className="profile-image" alt="profile-pic" />
      <h1 className="profile-name">{name}</h1>
      <p className="profile-description">{shortBio}</p>
    </div>
  )
}

export default ProfileCard
