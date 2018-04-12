import React from 'react';
import axios from 'axios'
import stationAbbr from '../data/stationAbbreviations.js'
import API_KEY from '../../../bartConfig.js'

class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stationAbbr: this.props.station,
      key: API_KEY,
      countdown: 50000,
      etd: 50000,
    }
  }

  componentDidMount() {
    this.timerId = setInterval( () => this.tick(), 1000)
  }
  componentWillReceiveProps(nextProps) {
    //let component do own http request
    const station = stationAbbr[this.props.station]
    const params = {
      cmd: 'etd', 
      orig: station,
      key: API_KEY,
      json: 'y'
    }
    axios.get('http://api.bart.gov/api/etd.aspx', {params: params})
    .then(data => {
    //setIntervalX
    console.log('from bart: ', data)
      let etd = 5;
      let lines = data.data.root.station[0].etd
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let direction = this.props.toward.substring(9,14)
        console.log('direction:', direction)
        let apiDirection = line.destination.substring(0,5) === 'SF Ai' ? 'Millb' : line.destination.substring(0,5)
        if (apiDirection === direction) {
          etd = line.estimate[0].minutes;
        }
      }
      this.setState({
        departureTime: parseInt(etd) * 60 * 1000 + new Date().getTime()
      })

      // this.tick();
    })
    .catch(err => console.log('clock error from bart', err.message))
  }

  componentWillUnmount() {
    //stop timer
    clearInterval(this.timerId)
  }

  tick() {
    let now = new Date().getTime()
    let distance = this.state.departureTime - now;
    console.log('distance', distance)
    let min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    console.log('min', min)
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    let currentCountDown = `${min}m ${seconds}s`
    this.setState({
      countdown: currentCountDown,
      distance: distance
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.distance > 1000 ? `Departing in ${this.state.countdown}`: 'Leaving'}</p> 
      </div>
    )
  }
}

export default Clock