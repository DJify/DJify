import React from 'react'
import { useParams } from 'react-router-dom'

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

const PartyAnimation = props => {
  const params = useParams()

  return (
    <div id="party">
      <div className="party-dj-wrapper center">
        <span className="party-dj-name">DJ {props.user.username}</span>
        <img
          className="party-dj"
          src={animations[params.avatarId || props.user.avatar]}
          alt="dj"
        />
        <img
          className="party-booth"
          src={require('../resources/img/dj-animations/DJ Booth.gif')}
          alt="booth"
        />
      </div>
    </div>
  )
}

export default PartyAnimation
