import React from 'react'
import SongListing from './SongListing'
import { Link } from 'react-router-dom'
import './styles.scss'

const GenreCard = ({
  genre,
  backingImgURL,
  rooms,
  onShowMoreListings,
  showAll,
}) => (
  <section className="card">
    <div
      className="backing"
      style={{ backgroundImage: `url(${backingImgURL})` }}
    >
      <h2>{genre}</h2>
    </div>
    {(showAll ? rooms : rooms.slice(0, 2)).map(roomInfo => (
      <SongListing {...roomInfo} />
    ))}
    {!showAll && (
      <Link
        to={`/dashboard/${genre}`}
        onClick={() => onShowMoreListings({ genre, backingImgURL, rooms })}
      >
        Show more
      </Link>
    )}
  </section>
)

export default GenreCard
