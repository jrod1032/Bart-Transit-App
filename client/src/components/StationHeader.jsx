import React from 'react';

const StationHeader = (props) => {
  return (
      <div className="directions-step">
        <div className="directions-line-header">
          <p className="line-name">{props.headLine}</p>
        </div>
      </div>
    )
}

export default StationHeader;