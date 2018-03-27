import React from 'react'
import axios from 'axios'

class TripPlanner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stations: [{name: 'Line Not Selected'}],
      start: [{name: 'Ashby'}],
      end: [{name: 'Ashby'}],
      directions: [{name: 'Ashby'}],
      changeTrains: false,
      secondLine: false,
      showDirections: false
    }
  }

  componentDidMount() {
    axios.get('/api/stations')
    .then( (stations) => {
      console.log('stations: ', stations.data)
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
      console.log('Directions:', directions.data)
      this.getStationsFromStartToFinish(directions.data, parseInt(this.state.start), parseInt(this.state.end))
    })
    .catch( err => console.log(err.message))
  }

  getStationsFromStartToFinish(stations, start, finish) {
    let startIndex = 0;
    let endIndex = 0
    for (let i = 0; i < stations.length; i++) {
      if (stations[i].id === start) {
        startIndex = i;
      } else if (stations[i].id === finish) {
        endIndex = i;
      }
    }

    const stationList = stations.slice(startIndex, endIndex + 1)
    console.log('stationList', stationList);
    this.setState({
      directions: stationList,
      startName: stationList[0].name,
      endName: stationList[stationList.length - 1].name,
      showDirections: true
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
            <p>31 minutes (arrive at 5:51pm)</p>
          </div>

          <div className="directions-step">
            <div className="directions-line-header">
              <p className="line-name">Start at {this.state.startName}</p>
            </div>
          </div>

          <div className="directions-step">
            <div className="directions-line-header">
              <div className="line-circle" style={{backgroundColor: "#ed1d24"}}></div>
              <p className="line-name">Red Line</p>
              <p className="line-direction">towards Station C</p>
            </div>
            <ul>
            {this.state.directions.map(station => {
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