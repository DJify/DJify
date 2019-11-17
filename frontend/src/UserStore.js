import React, { createContext, useContext, useReducer } from 'react'

const initialState = {
  id: '',
  token: '',
  username: '',
  wantsToDj: false,
  chosenAvatarId: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateUser':
      const updatedUser = {
        ...state,
        ...action,
      }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      return updatedUser

    case 'logIn':
      const loggedInUser = {
        ...state,
        id: action.userId,
        token: action.token,
      }
      localStorage.setItem('user', JSON.stringify(loggedInUser))
      return loggedInUser

    default:
      return state
  }
}

export const StateContext = createContext()

export const StateProvider = ({ children }) => {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      <LocalStorageUpdater>{children}</LocalStorageUpdater>
    </StateContext.Provider>
  )
}

const LocalStorageUpdater = ({ children }) => {
  const [user, dispatch] = useUserState()

  React.useEffect(() => {
    if (JSON.stringify(user) === JSON.stringify(initialState)) {
      dispatch({
        type: 'updateUser',
        ...JSON.parse(localStorage.getItem('user')),
      })
    }
  }, [user, dispatch])

  return <>{children}</>
}

export const useUserState = () => useContext(StateContext)
