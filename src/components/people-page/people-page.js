import React , {Component} from 'react';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import SwapiService from '../../services/swapi-service';



export default class PeoplePage extends Component {
    
    swapiService = new SwapiService();
    
    state={
        selectedPerson: null, 
        hasError: false
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    }

    componentDidCatch() {
        return (
            this.setState({
                hasError: true
            })
        )
    }

    resetSelectedPerson = () => {
        this.setState({
            selectedPerson: null
        })
    }

    render(){
        if(this.state.hasError){
            return <ErrorIndicator />
        }

        return(
            
        <div className="row mb2">
            <div className="col-md-6">
                <ItemList 
                    onItemSelected={this.onPersonSelected}
                    getData={this.swapiService.getAllPeople}/>
            </div>

            <div className="col-md-6">
                <PersonDetails 
                    personId={this.state.selectedPerson}
                    resetPerson={this.resetSelectedPerson}/>
            </div>

        </div>
        )
    }
}