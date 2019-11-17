import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './login'
import Dashboard from './dashboard'
import Account from './accountSetup'
import AddRoom from './addRoom'
import Genre from './genre'
import Room from './room'
import { StateProvider } from './UserStore'

function App() {
  const [moreGenreListings, setMoreGenreListings] = React.useState({
    genre: '',
    backingImgURL: '',
    rooms: [],
  })

  const onShowMoreListings = listings => {
    setMoreGenreListings(listings)
  }

  return (
    <BrowserRouter>
      <StateProvider>
        <main>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/account" component={Account} />
            <Route path="/room" component={Room} />
            <Route exact path="/dashboard/addRoom">
              <Dashboard />
              <AddRoom />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard onShowMoreListings={onShowMoreListings} />
            </Route>
            <Route path="/dashboard/:genre">
              <Genre {...moreGenreListings} />
            </Route>
          </Switch>
        </main>
      </StateProvider>
    </BrowserRouter>
  )
}

export default App
