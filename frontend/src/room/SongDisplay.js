import React from 'react';
import { IoMdHeart, IoMdVolumeMute } from 'react-icons/io';

const SongDisplay = (props) => <div className="song">
  <img
    className="song-album-cover"
    src={props.song.albumImg}
    alt="album" />
  <div className="song-content">
    <div className="song-title-label">{props.song.title}</div>
    <div className="song-artist-label">{props.song.artist}</div>
    <div className="song-album-label">{props.song.album}</div>
    {
      props.isDj &&
      <div className="song-playing-label">CURRENTLY PLAYING</div>
    }
  </div>
  <div className="song-actions">
    {
      !props.isDj &&
      <button>
        <IoMdHeart size={40}/>
      </button>
    }
    <button>
      <IoMdVolumeMute size={40}/>
    </button>
  </div>
</div>;

export default SongDisplay;
