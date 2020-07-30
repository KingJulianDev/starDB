import React , {Component} from 'react';
import Header from '../header';
import './app.css';
import ErrorButton from '../error-button';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ErrorIndicator from '../error-indicator'


export default class App extends Component {
  
  state = {
    showRandomPlanet: true,
    hasError: false
  };
  
  componentDidCatch() {
    this.setState({hasError: true})
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    })
  }

  

  render() {
    const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

      if(this.state.hasError) {
        return <ErrorIndicator />
      }

    return (
      <div>
        <Header />
        {planet}

      <div className='row mb2 button-row'>
        <button
          onClick={this.toggleRandomPlanet}
          className='toggle-planet btn btn-success btn-lg'>
          Show/hide random planet
        </button>
        
        <ErrorButton />
      </div>

        <PeoplePage />

    </div>
    );
  };
  
}
