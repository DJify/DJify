import React from 'react'

const Login = () => (
  <div>
    <div className="login-hero-wrapper">
      <img
        className="login-hero"
        src={require('../resources/img/rockin-out.gif')}
        alt="DANCE DANCE"
      />
      <div className="login-hero-overlay" />
    </div>
    <div className="login-body">
      <img
        className="logo center"
        src={require('../resources/img/icons/logo-02.png')}
        alt="DJ Silhouette"
      />
      <div style={{ marginTop: 20 }}>
        <button
          className="spotify-btn center"
          onClick={() => {
          window.location = window.location.href.includes('localhost')
          ? 'http://localhost:8888/login'
          : 'https://djify-backend.herokuapp.com/login'
          }}
          style={{ fontWeight: 600 }}
        >
          <img
            style={{ height: 20, width: 20, marginRight: 8 }}
            src={require('../resources/img/icons/spoofy-logo.png')}
            alt="Spotify logo"
          />
          Connect with Spotify
        </button>
        <p className="disclaimer center">
          Use your Spotify account to access songs to play and listen.
        </p>
      </div>
    </div>
  </div>
)

export default Login
