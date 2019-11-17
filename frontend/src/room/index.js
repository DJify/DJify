import React, { Component } from 'react';
import PartyAnimation from "./PartyAnimation";
import SongDisplay from "./SongDisplay";
import JudgeDisplay from "./JudgeDisplay";
import QueueDisplay from "./QueueDisplay";
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import {Link} from "react-router-dom";

const fakeUser = {
  username: "Khalid",
  avatar: 3,
};

const fakeSong = {
  album: "Starboy",
  title: "The Weekend",
  artist: "Starboy",
  albumImg: "http://i.imgur.com/mjqJhdD.jpg"
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

class Room extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDj: true,
      selected: 0,
      //amountAhead: 2,
      items: [],
      changedValues: false,
      //percent: -23,
    };
    this._handleClick = this._handleClick.bind(this);
    //this.handleOutletOrder = this.handleOutletOrder.bind(this);
  }

  async componentDidMount() {
    console.log(this.context[0]);
    // let url =  window.location.href.includes('localhost')
    //   ? 'http://localhost:8888/user/playlists'
    //   : 'https://djify-backend.herokuapp.com/user/playlists';
    // let response = await fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   params: JSON.stringify({
    //     access_token: "BQAlAeU3-DPzxGlRTuGRReprKPNDSxnPPDpji1B1gY0nkfcxp1lu_TVzap_AjjuerZ3PfFy4btybz5EGdrghuYo_VeJp8YWqpF7Lud6ixbI_rR58moB2GpdhiEOmbPbgluYY8uEqgpv07sTx8xlrJ2eJN9OQmARfQr-nFHV5lJ_lnltjd1fkxS-8EbcwRCUsNCw"
    //   })
    // });
    // let responseJson = await response.json();
  }

  // handleOutletOrder = (items) => {
  //   this.setState({items})
  // };

  _handleClick(selected) {
    this.setState({selected, changedValues: true});
  }

  render() {
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
  <SongDisplay
    song={fakeSong}
    isDj={this.state.isDj}/>
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
