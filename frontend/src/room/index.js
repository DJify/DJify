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

const fakeQueue = [
  {
    title: "Barboy",
    artist: "The Weekend",
  },
  {
    title: "Carboy",
    artist: "The Weekend",
  },
  {
    title: "Scarboy",
    artist: "The Weekend",
  },
];

class Room extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDj: true,
      amountAhead: 2,
      items: fakeQueue,
      percent: -23,
    };
    this.handleOutletOrder = this.handleOutletOrder.bind(this);
  }

  handleOutletOrder = (items) => {
    this.setState({items})
  };

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
          {
            this.state.isDj ?
              <div>
                <br />
                <div className="center">
                  {
                    this.state.amountAhead === 0 ?
                      <div>
                        <Progress percent={Math.abs(this.state.percent)} status={this.state.percent >= 0 ? "success" : "error"} />
                        {
                          this.state.percent >= 0 ? "You are on your way to an encore!" : "Too many dislikes, you might get booted!"
                        }
                      </div>
                      :
                      <div className="amount-label">
                        {this.state.amountAhead} DJs ahead of you.
                      </div>
                  }
                </div>
                <br />
                <hr />
              </div>
                :
              null
          }
          <SongDisplay
            song={fakeSong}
            isDj={this.state.isDj}/>
          {
            this.state.isDj ?
              <QueueDisplay
                handleOrder={this.handleOutletOrder}
                songs={this.state.items}/>
              :
              <JudgeDisplay
                dj={fakeUser}/>
          }
        </div>
      </div>
    )
  }
}

export default Room;
