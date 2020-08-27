import React , {Component} from 'react';
import Header from '../header';
import './app.css';
import ErrorButton from '../error-button';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import ItemDetails, {Record} from '../item-details';
import Row from '../row';


export default class App extends Component {
  
  swapiService = new SwapiService();

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
      <ErrorBoundry>
      <div className='stardb-app'>
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

      <Row 
        leftItem={
          <ItemDetails
            getData={this.swapiService.getPerson}
            getImageUrl={this.swapiService.getPersonImage}
            itemId={35}
          >
            <Record field='gender' label='Gender'/>
            <Record field='birthYear' label='Birth Year'/>
            <Record field='eyeColor' label='Eye color'/>
          </ItemDetails>
        }
        rightItem={
          <ItemDetails
            getData={this.swapiService.getPlanet}
            getImageUrl={this.swapiService.getPlanetImage}
            itemId={9}
          >
            <Record field='population' label='Population'/>
            <Record field='diameter' label='Diameter'/>
            <Record field='climate' label='Climate'/>
          </ItemDetails>
        }
      />

    </div>
    </ErrorBoundry>
    );
  };
}


//-----------------------
{/* <div className="row mb2">
              <div className="col-md-6">
                  <ItemList 
                    onItemSelected={this.onPersonSelected}
                    getData={this.swapiService.getAllPlanet} 
                    renderItem={(item) => `${item.name} (${item.diameter})`}/>
              </div>
              <div className="col-md-6">
                  <ItemDetails personId={this.state.selectedPerson}
                    resetPerson={this.resetSelectedPerson} />
              </div>
          </div>
          <div className="row mb2">
              <div className="col-md-6">
                  <ItemList 
                    onItemSelected={this.onPersonSelected}
                    getData={this.swapiService.getAllStarships}
                    renderItem={(item) => item.name} />
              </div>
              <div className="col-md-6">
                  <PersonDetails personId={this.state.selectedPerson}
                    resetPerson={this.resetSelectedPerson} />
              </div>
          </div> */}