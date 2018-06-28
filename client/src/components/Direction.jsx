import React from 'react';

const Direction = (props) => {
  return (
    <div className="directions-step">
     <div className="directions-line-header">
        <div className="line-circle" style={{backgroundColor: "#" + props.lineColor}}></div>
        <p className="line-name">{props.lineNameAndDirection[0]}</p>
        <p className="line-direction">{props.lineNameAndDirection[1]}</p>
      </div>
      <ul>
        {props.stations.map( (station) => {
          return <li>{station.name}</li>
        })}
      </ul>
    </div>
    )
}

export default Direction;