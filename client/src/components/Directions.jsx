import React from 'react';
import StationHeader from './StationHeader.jsx';
import Clock from './clock.jsx';
import ListOfDirections from './AllDirections.jsx';

const Directions = (props) => {                    
  return (
    <div className="directions">
      <div className="directions-summary">
        <p className="line-name">{props.startName} to {props.endName}</p>
        <Clock station={props.startName} toward={props.toward}/>
      </div>
      <StationHeader headLine={`Start at ${props.startName}`}/>
      <ListOfDirections directions={props.directions} />
      <StationHeader headLine={`End at ${props.endName}`}/>
    </div>    
    )
}

export default Directions;