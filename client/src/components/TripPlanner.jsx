import React from 'react'
import axios from 'axios'
import API_KEY from '../../../bartConfig.js'
import stationAbbr from '../data/stationAbbreviations.js'
import Clock from './clock.jsx'

class TripPlanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stations: [{name: 'Line Not Selected'}],
      start: [{name: 'Ashby'}],
      end: [{name: 'Ashby'}],
      changeTrains: false,
      secondLine: false,
      showDirections: false,
      etd: '0',
      parseServiceLine: this.parseServiceLine.bind(this)
    }
  }

  componentDidMount() {
    axios.get('/api/stations')
    .then( (stations) => {
      this.setState({
        stations: stations.data,
        start: stations.data[0].id,
        end: stations.data[0].id
      })
    })
    .catch( (err) => console.log(err.message))
  }

  handleGoClick() {
    axios.get(`/api/getDirections`, {params: {start:this.state.start, end:this.state.end}})
    .then( directions => {
      console.log('directions', directions)
      let startStations = directions.data[0].stations
      let startName = startStations[0].name
      let endStations = directions.data[directions.data.length - 1].stations;
      let endName = endStations[endStations.length -1].name
      this.setState({
        directions: directions.data,
        showDirections: true,
        startName: startName,
        endName: endName

      })
      let lineNameAndDirection = directions.data[0].lineName
      this.parseServiceLine(lineNameAndDirection)
    })
    .catch( err => console.log(err.message))
  }

  parseServiceLine(line) {
    let words = line.split(':');
    let color = words[0];
    let direction = words[1]
    this.setState({
      colorName: color,
      toward: direction
    })
  }

  handleStopSelect(e) {
    let selectedIndex = e.target.selectedIndex
    let id = e.target.id
    console.log(e.target[selectedIndex])
    if (id === 'start') {
      this.setState({
        start: e.target[selectedIndex].id
      })
    } else {
      this.setState({
        end: e.target[selectedIndex].id
      })
    }
  }

  render() {
    const changeTrains = this.state.directions && this.state.directions.length > 1 ?  <div className="directions-step">
            <div className="directions-line-header">
              <p className="line-name">Change Trains</p>
            </div>
          </div> : null
    let allDirections = [];

    const secondLine = this.state.directions && this.state.directions.length > 0 ? 
        this.state.directions.forEach( (direction, index) => {
          let lineNameAndDirection = direction.lineName.split(':')
          allDirections.push( <div className="directions-step">
            <div className="directions-line-header">
              <div className="line-circle" style={{backgroundColor: "#" + direction.lineColor}}></div>
              <p className="line-name">{lineNameAndDirection[0]}</p>
              <p className="line-direction">{lineNameAndDirection[1]}</p>
            </div>
            <ul>
              {direction.stations.map( (station) => {
                return <li>{station.name}</li>
              })}
            </ul>
          </div> )
          this.state.directions.length - 1 !== index ? allDirections.push(changeTrains) : null
        })
        : null 

    const directions = this.state.directions && this.state.showDirections ? 
        <div className="directions">
          <div className="directions-summary">
            <p className="line-name">{this.state.startName} to {this.state.endName}</p>
            <Clock station={this.state.startName} toward={this.state.toward}/>
          </div>

          <div className="directions-step">
            <div className="directions-line-header">
              <p className="line-name">Start at {this.state.startName}</p>
            </div>
          </div>
          {allDirections}
          <div className="directions-step">
            <div className="directions-line-header">
              <p className="line-name">Arrive at {this.state.endName}</p>
            </div>
          </div>
        </div> : null

    return (
      <div className="trip-planner-view">
        <div className="selections">
          Start: 
          <select id="start" onChange={this.handleStopSelect.bind(this)}>
            {this.state.stations.map( (station) => {
              return <option id={station.id}>{station.name}</option>
            })}
            }
          </select>

          <br />

          End: 
          <select id="end" onChange={this.handleStopSelect.bind(this)}>
            {this.state.stations.map( (station) => {
              return <option id={station.id}>{station.name}</option>
            })}
          </select>

          <br />

          <button onClick={this.handleGoClick.bind(this)}>Go!</button>
        </div>

        {directions}
      </div>
    )    
  }
}

export default TripPlanner