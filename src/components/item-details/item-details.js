import React, { Component } from 'react';
import './item-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button'; 

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export {
  Record
};

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state={
    item: null,
    image: null
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
    const { itemId, getData, getImageUrl } = this.props; 
      if(!itemId) {
        return;
      }
    getData(itemId)
    .then((item) => {
      this.setState({
        item,
        image: getImageUrl(itemId)
      })
    })
  }



  
  render() {

    const ItemView = ({item}) => {

      
      const {id, name, gender, birthYear, eyeColor} = item;
      const {image} = this.state;
      return (
        
        <div className="item-details card">
          <img className="item-image" alt='person'
            src={image} />
    
          <div className="card-body">
            <h4>{name}</h4>
            <ul className="list-group list-group-flush">
              {
                React.Children.map(this.props.children, (child) => {
                  return React.cloneElement(child, {item})
                })
              }
            </ul>
          </div>
        </div>
      )
    }
    const {loading, item } = this.state; 
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