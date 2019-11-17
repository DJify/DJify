import React, { Component } from 'react';
import { IoIosMove } from 'react-icons/io';
import DraggableList from 'react-draggable-list';
import Modal from 'react-modal';
import TextInput from "../components/TextInput";
import { StateContext } from "../UserStore";
var _ = require('lodash');

const customStyles = {
  overlay: {
    zIndex: 5,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  content : {
    zIndex: 6,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class Outlet extends React.Component {

  getDragHeight() {
    return 40;
  }

  render() {
    const {item, dragHandleProps} = this.props;

    return (
      <div {...dragHandleProps} className="queue-cell">
        <b>
          { item.title }
          <br />
          { item.artist }
        </b>
        <IoIosMove size={30}/>
      </div>
    );
  }
}

const list = [
  {
    song: "Blank Space",
    artist: "Taylor Swift",
    album: "1982"
  },
  {
    song: "Blank Space",
    artist: "Taylor Swift",
    album: "1982"
  },
  {
    song: "Blank Space",
    artist: "Taylor Swift",
    album: "1982"
  },
  {
    song: "Blank Space",
    artist: "Taylor Swift",
    album: "1982"
  },
  {
    song: "Blank Space",
    artist: "Taylor Swift",
    album: "1982"
  },
  {
    song: "Blank Space",
    artist: "Taylor Swift",
    album: "1982"
  },
  {
    song: "Blank Space",
    artist: "Taylor Swift",
    album: "1982"
  },
  {
    song: "Blank Space",
    artist: "Taylor Swift",
    album: "1982"
  },
  {
    song: "Blank Space",
    artist: "Taylor Swift",
    album: "1982"
  },
];

class QueueDisplay extends Component {

  static contextType = StateContext;

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      searchTerm: '',
      items: []
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    console.log(this.context[0]);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  _onChange = (e) => {
    this.setState({searchTerm: e.target.value});
    _.debounce(this.search(e.target.value));
  };

  async search(searchQuery) {
    let url =  window.location.href.includes('localhost')
      ? 'http://localhost:8888/search'
      : 'https://djify-backend.herokuapp.com/search';
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token: this.context[0].token,
        searchQuery
      })
    });
    let responseJson = await response.json();
    console.log(response);
  };

  render() {
    return(
      <div>
        <hr />
        <div id="queue-container" ref={(i)=>this._list = i}>
          <DraggableList list={this.props.songs}
                         itemKey="title"
                         template={Outlet}
                         onMoveEnd={this.props.handleOrder}
                         container={()=>this._list}/>
        </div>
        <br />
        <button
          onClick={this.openModal}
          className="btn-block">
          Add song
        </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Search song"
          style={customStyles}
        >
          <TextInput
            id="song_search"
            label="Search"
            onChange={this._onChange}
            value={this.state.searchTerm}
          />
          <br />
          <div className="list">
            {
              list.map((item, index) =>
                <div className="search-result">
                  <b>{item.song}</b>
                  <br />
                  {item.artist}
                  <div className="color-neutral">
                    {item.album}
                  </div>
                </div>
              )
            }
          </div>
        </Modal>
      </div>
    )
  }
}

export default QueueDisplay;
