import React , {Component} from 'react';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry';
import ErrorButton from '../error-button';



export default class PeoplePage extends Component {
    
    swapiService = new SwapiService();
    
    state={
        selectedItem: 35, 
        hasError: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedItem: id
        })
    }

    componentDidCatch() {
        return (
            this.setState({
                hasError: true
            })
        )
    }


    render(){
        if(this.state.hasError){
            return <ErrorIndicator />
        }

        return(
            
        <div className="row mb2">
            <div className="col-md-6">
                <ItemList 
                    onItemSelected={this.onItemSelected}
                    getData={this.swapiService.getAllPeople}
                    renderItem={(item) => `${item.name} (${item.gender})`} />
            </div>

            <div className="col-md-6">
                
                <ItemDetails 
                    itemId={this.state.selectedItem}/>
            </div>

        </div>
        )
    }
}