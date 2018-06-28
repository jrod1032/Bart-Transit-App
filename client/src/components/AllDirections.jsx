import React from 'react';
import StationHeader from './StationHeader.jsx';
import Direction from './Direction.jsx';

const ListOfDirections = (props) => {
  return props.directions.map( (direction, index) => {
    let lineNameAndDirection = direction.lineName.split(':'); 
    let changeStop = index + 1 === props.directions.length
      ? null
      : <StationHeader headLine={'Change Station'} />
    return (
      <div key={index}>
        <Direction 
        lineNameAndDirection={lineNameAndDirection}
        lineColor={direction.lineColor} 
        stations={direction.stations}
        />  
        {changeStop}
      </div>
    )       
  })
}

export default ListOfDirections;