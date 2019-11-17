import React from 'react'
import { IoIosArrowForward as ArrowIcon } from 'react-icons/io'

const SongListing = ({ name, djList, imgURL, listenerCount }) => (
  <section className="song">
    <img src={imgURL} alt={name} />
    <div className="text">
      <h3>{name}</h3>
      <p>{`Feat. ${djList[0]}`}</p>
      <small>{`${listenerCount} listeners`}</small>
    </div>
    <div className="arrow-icon">
      <ArrowIcon size={30} />
    </div>
  </section>
)

export default SongListing
