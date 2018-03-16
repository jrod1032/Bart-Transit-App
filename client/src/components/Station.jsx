import React from 'react'
import axios from 'axios'

class Station extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFavorite: this.props.isFavorite,
    }
  }

  toggleFavorite(e) {
    let stationId = e.target.id;
    console.log('beforeIsfavorute: ', this.state.isFavorite)
    axios.patch(`api/lines/${stationId}`)
    .then( (confirmation) => {
      console.log('confirm:',confirmation);
      this.setState({
        isFavorite: this.state.isFavorite ? false : true,
      })
    })
    .catch( (err) => console.log(err.message))
  }

  render() {
    return (
      <li 
      onClick={this.toggleFavorite.bind(this)}
      id={this.props.id}
      class={this.state.isFavorite ? 'green' : 'black'}>{this.props.name}</li>
      )
  }
}

export default Station;