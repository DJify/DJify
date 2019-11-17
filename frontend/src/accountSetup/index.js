import React from 'react'
import TextInput from '../components/TextInput'
import Toggle from 'react-toggle'
import 'react-toggle/style.css'
import { Link, useLocation } from 'react-router-dom'
import { useUserState } from '../UserStore'

const images = [
  require('../resources/img/avatar/WhiteMale.png'),
  require('../resources/img/avatar/TanMale.png'),
  require('../resources/img/avatar/BrownMale.png'),
  require('../resources/img/avatar/BlackMale.png'),
  require('../resources/img/avatar/WhiteFemale.png'),
  require('../resources/img/avatar/TanFemale.png'),
  require('../resources/img/avatar/BrownFemale.png'),
  require('../resources/img/avatar/BlackFemale.png'),
]

const animations = [
  require('../resources/img/dj-animations/DJ White Male.gif'),
  require('../resources/img/dj-animations/DJ Tan Male.gif'),
  require('../resources/img/dj-animations/DJ Brown Male.gif'),
  require('../resources/img/dj-animations/DJ Black Male.gif'),
  require('../resources/img/dj-animations/DJ White Female.gif'),
  require('../resources/img/dj-animations/DJ Tan Female.gif'),
  require('../resources/img/dj-animations/DJ Brown Female.gif'),
  require('../resources/img/dj-animations/DJ Black Female.gif'),
]

const Account = () => {
  const [user, dispatch] = useUserState()
  const location = useLocation()
  const [username, setUsername] = React.useState(user.username)
  const [dj, setDj] = React.useState(user.wantsToDj)
  const [chosenAvatarId, setChosenAvatarId] = React.useState(
    user.chosenAvatarId
  )

  React.useEffect(() => {
    setDj(user.wantsToDj)
    setUsername(user.username)
    setChosenAvatarId(user.chosenAvatarId)
  }, [user])

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    const userId = params.get('spotify_user_id')
    const token = params.get('access_token')
    const currUser = localStorage.getItem('user')

    if (userId && token) {
      dispatch({
        type: 'logIn',
        userId: params.get('spotify_user_id'),
        token: params.get('access_token'),
        ...currUser,
      })
    }
  }, [location, dispatch])

  const onChange = e => {
    setUsername(e.target.value)
  }

  const handleToggle = e => {
    setDj(e.target.checked)
  }

  const onSubmit = () => {
    dispatch({
      type: 'updateUser',
      username,
      chosenAvatarId,
      wantsToDj: dj,
    })
  }

  return (
    <div id="account" className="center">
      <TextInput
        id="account_username"
        label="Username"
        onChange={onChange}
        value={username}
      />
      <br />
      <label>Select an avatar</label>
      <div className="avatar-row center">
        {images.map((item, index) => (
          <img
            onClick={() => setChosenAvatarId(index)}
            src={chosenAvatarId === index ? animations[index] : item}
            style={{
              height: chosenAvatarId === index ? 120 : 110,
            }}
            className="avatar"
            key={index}
            alt={index}
          />
        ))}
      </div>
      <br />
      <label className="toggle-wrapper">
        <span>Do you want to be a DJ?</span>
        <Toggle checked={dj} onChange={handleToggle} />
      </label>
      <br />
      {username.length > 0 && (
        <Link to="/dashboard" className="btn-block" onClick={onSubmit}>
          Start listening
        </Link>
      )}
    </div>
  )
}

export default Account
