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
        listenerCount: 0,
      },
    ],
  },
]

const Dashboard = ({ onShowMoreListings }) => {
  const [filteredData, setFilteredData] = React.useState(dummyData);

  React.useEffect(() => {
    fetch('/concert')
      .then(res => res.json())
      .then(data => {
        console.log(data.roomsByGenre)
        setFilteredData(data.roomsByGenre)
      })
  }, [])

  const onSearch = searchBy => {
    const filtered = dummyData.filter(item =>
      item.genre.toLowerCase().includes(searchBy.toLowerCase())
    );
    setFilteredData(filtered)
  };

  return (
    <section className="dashboard-page">
      <Nav onSearch={onSearch} />
      {filteredData.map(({ _id, rooms }) => (
        <GenreCard
          key={_id}
          genre={_id}
          backingImgURL="/example-media/concert-strobe.gif"
          rooms={rooms}
          onShowMoreListings={onShowMoreListings}
        />
      ))}
    </section>
  )
}

export default Dashboard
