import React from 'react'
import axios from 'axios'
import API_KEY from '../../../bartConfig.js'
import stationAbbr from '../data/stationAbbreviations.js'

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
      etd: '10'
    }
  }

  componentDidMount() {
    axios.get('/api/stations')
    .then( (stations) => {
      this.setState({
        stations: stations.data,
        start: stations.data[0],
        end: stations.data[0]
      })
    })
    .catch( (err) => console.log(err.message))
  }

  handleGoClick() {
    axios.get(`/api/getDirections`, {params: {start:this.state.start, end:this.state.end}})
    .then( directions => {
      console.log('directions', directions)
      const { color, direction} = this.parseServiceLine(directions.data.lineName);
      const stationList = directions.data.stations;
      this.setState({
        stationList: stationList,
        startName: stationList[0].name,
        endName: stationList[stationList.length - 1].name,
        showDirections: true,
        color: color,
        colorHex: directions.data.lineColor,
        direction: direction
      })
      this.getDepartureTime()
    })
    .catch( err => console.log(err.message))
  }

  parseServiceLine(line) {
    let words = line.split(':');
    let color = words[0];
    let direction = words[1]
    return {color, direction}
  }

  getDepartureTime() {
    let station = stationAbbr[this.state.startName];
    console.log('stationAbbr', station)
    let params = {
      cmd: 'etd',
      orig: station,
      key: API_KEY,
      json: 'y'
    }
    axios.get('http://api.bart.gov/api/etd.aspx', {params: params} )
      .then( data => {
        console.log('Data from Bart: ', data.data.root)
        this.setState({
          etd: data.data.root.station[0].etd[0].estimate[0].minutes
        })

      })
      .catch(err => console.log('Error from bart: ', err.message))  
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
    const changeTrains = this.state.changeTrains ?  <div className="directions-step">
            <div className="directions-line-header">
              <p className="line-name">Change Trains</p>
            </div>
          </div> : null

    const secondLine = this.state.secondLine ?  <div className="directions-step">
            <div className="directions-line-header">
              <div className="line-circle" style={{backgroundColor: "#0099cc"}}></div>
              <p className="line-name">Blue Line</p>
              <p className="line-direction">towards Station F</p>
            </div>
            <ul>
              {this.state.secondLine.map( (station) => {
                return <li>{station.name}</li>
              })}
            </ul>
          </div> : null

    const directions = this.state.showDirections ? 
        <div className="directions">
          <div className="directions-summary">
            <p className="line-name">{this.state.startName} to {this.state.endName}</p>
            <p>{this.state.etd} minutes. (arrive at ???)</p>
          </div>

          <div className="directions-step">
            <div className="directions-line-header">
              <p className="line-name">Start at {this.state.startName}</p>
            </div>
          </div>

          <div className="directions-step">
            <div className="directions-line-header">
              <div className="line-circle" style={{backgroundColor: "#" + this.state.colorHex}}></div>
              <p className="line-name">{this.state.color}</p>
              <p className="line-direction">{this.state.direction}</p>
            </div>
            <ul>
            {this.state.stationList.map(station => {
             return <li>{station.name}</li>
            })}
            </ul>
          </div>
          {changeTrains}
          {secondLine}
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