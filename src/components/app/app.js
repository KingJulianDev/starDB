import React , {Component} from 'react';
import Header from '../header';
import './app.css';
import ErrorButton from '../error-button';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import ItemDetails from '../item-details'
import SwapiService from '../../services/swapi-service';



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

        <div className="row mb2">
            <div className="col-md-6">
                <ItemList 
                    onItemSelected={this.onItemSelected}
                    getData={this.swapiService.getAllPlanet}
                    renderItem={(item) => `${item.name} (${item.population})`} />
            </div>

            <div className="col-md-6">
                
                <ItemDetails 
                    itemId={this.state.selectedItem}/>
            </div>

        </div>

          

    </div>
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