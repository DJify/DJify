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

var spotifyApi = new Spotify();

class Room extends Component {

  static contextType = StateContext;

  constructor(props) {
    super(props);
    this.state = {
      isDj: false,
      selected: 0,
      user: {
        username: "",
        avatar: 0,
      },
      //amountAhead: 2,
      items: [],
      changedValues: false,
      curSong: null
      //percent: -23,
    };
    this._handleClick = this._handleClick.bind(this);
    //this.handleOutletOrder = this.handleOutletOrder.bind(this);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let that = this;
    if (this.context && this.context[0] && this.context[0].token && this.state.user.username === "") {
      await spotifyApi.setAccessToken(this.context[0].token);
      if (this.state.isDj) {
        spotifyApi.getUserPlaylists()
          .then(function(data) {
            that.setState({
              items: data.items
            });
            console.log('User playlists', data);
          }, function(err) {
            console.error(err);
          });
        this.setState({
          user: {
            username: this.context[0].username,
            avatar: this.context[0].chosenAvatarId,
          }
        });
      }
    }
  }

  async componentDidMount() {
    let that = this;
    if (this.context && this.context[0] && this.context[0].token.length > 0) {
      await spotifyApi.setAccessToken(this.context[0].token);
      if (this.state.isDj) {
        spotifyApi.getUserPlaylists()
          .then(function (data) {
            that.setState({
              items: data.items
            });
            console.log('User playlists', data);
          }, function (err) {
            console.error(err);
          });
        this.setState({
          user: {
            username: this.context[0].username,
            avatar: this.context[0].chosenAvatarId,
          }
        });
      }
      this.getCurrentPlaybackState();
      setInterval(() => this.getCurrentPlaybackState(), 5000);
    }
  }

  // handleOutletOrder = (items) => {
  //   this.setState({items})
  // };

  _handleClick(selected) {
    this.setState({selected, changedValues: true});
  }

  getCurrentPlaybackState() {
    const _this = this;
    spotifyApi.getMyCurrentPlaybackState().then(result => {
      if (result && result.item)
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
      <button className="float-btn link-btn">
        <Link to="/dashboard">
        Back
        </Link>
      </button>
      <PartyAnimation user={this.state.user}/>
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
  {! this.state.force && curSong && <SongDisplay
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
