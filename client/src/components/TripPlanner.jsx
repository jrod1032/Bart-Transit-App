import React from 'react'
import axios from 'axios'
import API_KEY from '../../../bartConfig.js'
import stationAbbr from '../data/stationAbbreviations.js'
import Clock from './clock.jsx';
import Directions from './Directions.jsx';
import TripSelector from './TripSelector.jsx'

class TripPlanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directionsInfo: null,
      stations: [{name: 'Line Not Selected'}],
      directions: null,
      start: [{name: 'Ashby'}],
      end: [{name: 'Ashby'}],
      changeTrains: false,
      secondLine: false,
      showDirections: false,
      etd: '0',
    }
    this.parseServiceLine = this.parseServiceLine.bind(this)
    this.handleStopSelect = this.handleStopSelect.bind(this)
    this.handleGoClick = this.handleGoClick.bind(this)
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
      let startStations = directions.data[0].stations
      let startName = startStations[0].name
      let endStations = directions.data[directions.data.length - 1].stations;
      let endName = endStations[endStations.length -1].name
      let lineNameAndDirection = directions.data[0].lineName
      let { toward, colorName } = this.parseServiceLine(lineNameAndDirection)
      this.setState({
        directionsInfo: {
          directions: directions.data,
          showDirections: true,
          startName: startName,
          endName: endName,
          toward: toward
        },
          colorName: colorName
      })
    })
    .catch( err => console.log(err.message))
  }

  parseServiceLine(line) {
    let words = line.split(':');
    let colorName = words[0];
    let toward = words[1]
    return {toward, colorName }
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
    let stationsInfo = {
      handleStopSelect: this.handleStopSelect,
      handleGoClick: this.handleGoClick,
      stations: this.state.stations
    }
    return (
      <div className="trip-planner-view">
         {this.props.children(stationsInfo, this.state.directionsInfo)}
      </div>
    )    
  }

}
export default TripPlanner