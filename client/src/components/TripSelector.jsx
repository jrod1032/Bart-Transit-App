import React from 'react';

const TripSelector = (props) => {
  return (
    <div className="selections">
      Start: 
      <select id="start" onChange={props.handleStopSelect}>
        {props.stations.map( (station, index) => {
          return <option key={index} id={station.id}>{station.name}</option>
        })}
        }
      </select>

      <br />

      End: 
      <select id="end" onChange={props.handleStopSelect}>
        {props.stations.map( (station, index) => {
          return <option key={index} id={station.id}>{station.name}</option>
        })}
      </select>

      <br />

      <button onClick={props.handleGoClick}>Go!</button>
    </div>    
    )
}

export default TripSelector;