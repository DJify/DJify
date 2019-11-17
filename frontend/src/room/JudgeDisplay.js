import React from 'react';
import { IoIosThumbsUp, IoIosThumbsDown } from 'react-icons/io';

const JudgeDisplay = (props) => <div>
  <hr />
  <label>How is DJ {props.dj.username} doing?</label>
  <div className="judge-row">
    <button>
      <IoIosThumbsUp size={30}/>
    </button>
    <button className="negative">
      <IoIosThumbsDown size={30}/>
    </button>
  </div>
</div>;

export default JudgeDisplay;
