import React, { Component } from 'react';
import PartyAnimation from "./PartyAnimation";
import SongDisplay from "./SongDisplay";
import JudgeDisplay from "./JudgeDisplay";
import QueueDisplay from "./QueueDisplay";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import {Link} from "react-router-dom";
import { StateContext } from "../UserStore";
var Spotify = require('spotify-web-api-js');

const fakeUser = {
  username: "Khalid",
  avatar: 3,
};


const fakePlaylists = [
  {
    name: "Barboy",
  },
  {
    name: "Carboy",
  },
  {
    name: "Scarboy",
  },
];

var spotifyApi = new Spotify();

class Room extends Component {

  static contextType = StateContext;

  constructor(props) {
    super(props);
    this.state = {
      isDj: true,
      selected: 0,
      //amountAhead: 2,
      items: [],
      changedValues: false,
      curSong: null
      //percent: -23,
    };
    this._handleClick = this._handleClick.bind(this);
    //this.handleOutletOrder = this.handleOutletOrder.bind(this);
  }

  componentDidMount() {
    if (this.context && this.context[0] && this.context[0].token.length > 0)
      spotifyApi.setAccessToken(this.context[0].token);
      this.getCurrentPlaybackState();
      setInterval(() => this.getCurrentPlaybackState(), 5000);
  }

  // handleOutletOrder = (items) => {
  //   this.setState({items})
  // };

  _handleClick(selected) {
    this.setState({selected, changedValues: true});
  }

  getCurrentPlaybackState() {
    const _this = this
    spotifyApi.getMyCurrentPlaybackState().then(result => {
      _this.setState({
        curSong: {
          album: result.item.album.name,
          title: result.item.name,
          artist: result.item.artists[0].name,
          albumImg: result.item.album.images[0].url,
        }
      });
    });
  }

  render() {
    let {curSong} = this.state;

    return(
      <div id="room">
      <button
    className="float-btn link-btn">
      <Link to="/dashboard">
      Back
      </Link>
      </button>
      <PartyAnimation user={fakeUser}/>
    <div id="room-controls" className="center">
      {/*{*/}
    {/*  this.state.isDj ?*/}
    {/*    <div>*/}
    {/*      <br />*/}
    {/*      <div className="center">*/}
    {/*        {*/}
    {/*          this.state.amountAhead === 0 ?*/}
    {/*            <div>*/}
    {/*              <Progress percent={Math.abs(this.state.percent)} status={this.state.percent >= 0 ? "success" : "error"} />*/}
    {/*              {*/}
    {/*                this.state.percent >= 0 ? "You are on your way to an encore!" : "Too many dislikes, you might get booted!"*/}
    {/*              }*/}
    {/*            </div>*/}
    {/*            :*/}
    {/*            <div className="amount-label">*/}
    {/*              {this.state.amountAhead} DJs ahead of you.*/}
    {/*            </div>*/}
    {/*        }*/}
    {/*      </div>*/}
    {/*      <br />*/}
    {/*      <hr />*/}
    {/*    </div>*/}
    {/*      :*/}
    {/*    null*/}
    {/*}*/}
  {curSong && <SongDisplay
    song={curSong}
    isDj={this.state.isDj}/>}
    <br />
    <small
    style={{ marginBottom: 12 }}
    className="color-neutral">{
      this.state.changedValues ?
        "Your changes will happen after this song"
        : "Select a playlist"
    }</small>
    {
      this.state.isDj && this.state.items.length > 0 &&
      this.state.items.map((item, index) =>
          <div
        onClick={() => this._handleClick(index)}
      style={{ color: this.state.selected === index ? '#7c89ff' : '#000000' }}
      className="search-result">
        <b>{item.name}</b>
        </div>
    )
    }
    {/*{*/}
    {/*  this.state.isDj ?*/}
    {/*    <QueueDisplay*/}
    {/*      handleOrder={this.handleOutletOrder}*/}
    {/*      songs={this.state.items}/>*/}
    {/*    :*/}
    {/*    <JudgeDisplay*/}
    {/*      dj={fakeUser}/>*/}
    {/*}*/}
  </div>
    </div>
  )
  }
}

export default Room;
