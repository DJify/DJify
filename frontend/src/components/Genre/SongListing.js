import React from 'react'
import { IoIosArrowForward as ArrowIcon } from 'react-icons/io'
import { Link } from 'react-router-dom'

const images = [
  require('../../resources/img/avatar/WhiteMale.png'),
  require('../../resources/img/avatar/TanMale.png'),
  require('../../resources/img/avatar/BrownMale.png'),
  require('../../resources/img/avatar/BlackMale.png'),
  require('../../resources/img/avatar/WhiteFemale.png'),
  require('../../resources/img/avatar/TanFemale.png'),
  require('../../resources/img/avatar/BrownFemale.png'),
  require('../../resources/img/avatar/BlackFemale.png'),
]

const SongListing = ({ name, djUserId, avatarId, listenerCount, roomId }) => (
  <Link className="blank-link" to={`/room/${roomId || 0}`}>
    <section className="song">
      <img src={images[avatarId || 0]} alt={name} />
      <div className="text">
        <h3>{name}</h3>
        <p>{`Feat. ${djUserId}`}</p>
        <small>{`${listenerCount || 21} listeners`}</small>
      </div>
      <div className="arrow-icon">
        <ArrowIcon size={30} />
      </div>
    </section>
  </Link>
)

export default SongListing
