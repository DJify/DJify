import React from 'react'
import { FaUserCircle as ProfileIcon } from 'react-icons/fa'
import { IoIosAdd as AddIcon } from 'react-icons/io'
import { Link } from 'react-router-dom'
import TextInput from '../components/TextInput'

const Nav = ({ onSearch }) => {
  const onChangeSearch = e => {
    const newSearch = e.target.value
    onSearch(newSearch)
  }

  return (
    <nav>
      <Link to="/account">
        <ProfileIcon size={40} />
      </Link>
      <div className="genre-search-container">
        <TextInput id="search_genre" label="Search" onChange={onChangeSearch} />
      </div>
      <Link to="/dashboard/addRoom">
        <AddIcon size={40} />
      </Link>
    </nav>
  )
}

export default Nav
