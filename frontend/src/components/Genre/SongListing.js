import React from 'react'
import { IoIosArrowForward as ArrowIcon } from 'react-icons/io'
import { Link } from 'react-router-dom'

const SongListing = ({ name, djUserId, imgURL, listenerCount }) => (
  <Link className="blank-link" to="/room">
    <section className="song">
      <img src={imgURL} alt={name} />
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
