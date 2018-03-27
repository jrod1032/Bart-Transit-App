import React from 'react';
import axios from 'axios';

import Station from './Station.jsx'

class Lines extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lines: ['red', 'blue', 'green'],
      selected: 'red',
      stationsOnLine: [{name: 'Line Not Selected'}]
    }
  }

  componentDidMount() {
    axios.get('/api/lines')
    .then( (lines) => {
      this.setState({
        lines: lines.data,
        selected: lines.data[0].id,
      })
      this.getStationsOnLine(lines.data[0].id)
    })
    .catch( (err) => console.log(err.message))
  }

  handleStopSelect(e) {
    let selectedIndex = e.target.selectedIndex;
    this.setState({
      selected: e.target[selectedIndex].value
    })
    this.getStationsOnLine(e.target[selectedIndex].id)
  }

  getStationsOnLine(lineId) {
    console.log('lineId: ', lineId)
    axios.get(`/api/lines/${lineId}`)
    .then( (stationsOnLine) => {
      console.log('Stations: ', stationsOnLine)
      this.setState({stationsOnLine: stationsOnLine.data})
    })
    .catch( (err) => console.log(err.message))
  }

  render() {
    return (
      <div className="lines-view">
        <div className="selections">
          Choose a line:
          <select onChange={this.handleStopSelect.bind(this)}>
            {this.state.lines.map( line => {
              return <option id={line.id}>{line.name}</option>
            })}
          </select>
        </div>
        <div className="lines-stop-list">
          <ul>
            {this.state.stationsOnLine.map( station =>  {
             return <Station
             id={station.id}
             name={station.name}
             isFavorite={station.is_favorite} />
            })}
          </ul>
        </div>
      </div>
    );
  }

}

export default Lines;