import React from 'react'
import GenreCard from '../components/Genre'
import Nav from './Nav'
import './styles.scss'

const dummyData = [
  {
    genre: 'Pop',
    backingImgURL: '/example-media/concert-strobe.gif',
    rooms: [
      {
        imgURL: '/example-media/album-cover.jpg',
        name: 'Party Room',
        djList: ['DJ Howey'],
        listenerCount: 21,
      },
      {
        imgURL: '/example-media/album-cover.jpg',
        name: 'Party Room',
        djList: ['DJ Howey'],
        listenerCount: 21,
      },
      {
        imgURL: '/example-media/album-cover.jpg',
        name: 'Party Room',
        djList: ['DJ Howey'],
        listenerCount: 21,
      },
      {
        imgURL: '/example-media/album-cover.jpg',
        name: 'Party Room',
        djList: ['DJ Howey'],
        listenerCount: 21,
      },
      {
        imgURL: '/example-media/album-cover.jpg',
        name: 'Party Room',
        djList: ['DJ Howey'],
        listenerCount: 21,
      },
      {
        imgURL: '/example-media/album-cover.jpg',
        name: 'Party Room',
        djList: ['DJ Howey'],
        listenerCount: 21,
      },
      {
        imgURL: '/example-media/album-cover.jpg',
        name: 'Party Room',
        djList: ['DJ Howey'],
        listenerCount: 21,
      },
      {
        imgURL: '/example-media/album-cover.jpg',
        name: 'Party Room',
        djList: ['DJ Howey'],
        listenerCount: 21,
      },
      {
        imgURL: '/example-media/album-cover.jpg',
        name: 'Party Room',
        djList: ['DJ Howey'],
        listenerCount: 21,
      },
      {
        imgURL: '/example-media/album-cover.jpg',
        name: 'Party Room',
        djList: ['DJ Howey'],
        listenerCount: 21,
      },
      {
        imgURL: '/example-media/album-cover.jpg',
        name: 'Party Room',
        djList: ['DJ Howey'],
        listenerCount: 21,
      },
      {
        imgURL: '/example-media/album-cover.jpg',
        name: 'Party Room',
        djList: ['DJ Howey'],
        listenerCount: 21,
      },
    ],
  },
  {
    genre: 'Lofi',
    backingImgURL: '/example-media/concert-strobe.gif',
    rooms: [
      {
        imgURL: '/example-media/album-cover.jpg',
        name: 'Party Room',
        djList: ['DJ Howey'],
        listenerCount: 21,
      },
      {
        imgURL: '/example-media/album-cover.jpg',
        name: 'Party Room',
        djList: ['DJ Howey'],
        listenerCount: 21,
      },
      {
        imgURL: '/example-media/album-cover.jpg',
        name: 'Party Room',
        djList: ['DJ Howey'],
        listenerCount: 21,
      },
    ],
  },
]

const Dashboard = ({ onShowMoreListings }) => {
  const [filteredData, setFilteredData] = React.useState(dummyData)

  const onSearch = searchBy => {
    const filtered = dummyData.filter(item =>
      item.genre.toLowerCase().includes(searchBy.toLowerCase())
    )
    setFilteredData(filtered)
  }

  return (
    <section className="dashboard-page">
      <Nav onSearch={onSearch} />
      {filteredData.map(({ genre, backingImgURL, rooms }) => (
        <GenreCard
          key={genre}
          genre={genre}
          backingImgURL={backingImgURL}
          rooms={rooms}
          onShowMoreListings={onShowMoreListings}
        />
      ))}
    </section>
  )
}

export default Dashboard
