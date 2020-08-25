import React, { Component } from 'react';
import './item-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button'; 


export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state={
    item: null, 
    loading: true
  }

  componentDidMount() {
    this.updateItem()
  }

  componentDidUpdate(prevProps) {
    if(this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId } = this.props; 
      if(!itemId) {
        return;
      }
    this.swapiService
    .getPerson(itemId)
    .then((item) => {
      this.setState({
        item,
        loading: false
      })
    })
  }


  render() {
    const {loading, item} = this.state; 
    const isLoading = loading ? <Spinner /> : null ;
    const hasData = !(loading) ;
    const isReady = hasData ? <ItemView item={item} />  : null ;


    if(!this.state.item){
      return(
        <span>Select an item to see details</span>
      )
    }

    return(
      <div>
        {isLoading}
        {isReady}
        
        <ErrorButton />
      </div>
    )
  }
}

const ItemView = ({item}) => {

  const {id, name, gender, birthYear, eyeColor} = item;

  return (
    
    <div className="item-details card">
      <img className="item-image" alt='person'
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </div>
  )
}




//кнопка скрыть детали и функция к ней
{/* <button 
          onClick={()=> { this.onHideDetails(); this.props.resetItem() ; } }
          className='btn btn-success btn-lg'>
            Hide item details
        </button> 
      
      onHideDetails = () => {
    this.setState({
      showItemDetails: false
    })
  }
      */}