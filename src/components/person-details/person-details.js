import React, { Component } from 'react';
import './person-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';
import ErrorButton from '../error-button'; 


export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  state={
    person: null, 
    loading: true,
    showPersonDetails: false
  }

  componentDidMount() {
    this.updatePerson()
  }

  componentDidUpdate(prevProps) {
    if(this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props; 
      if(!personId) {
        return;
      }
    this.swapiService
    .getPerson(personId)
    .then((person) => {
      this.setState({
        person,
        loading: false, 
        showPersonDetails: true
      })
    })
  }

  onHideDetails = () => {
    this.setState({
      showPersonDetails: false
    })
  }

  render() {
    const {loading, person} = this.state; 
    const isLoading = loading ? <Spinner /> : null ;
    const hasData = !(loading) ;
    const isReady = hasData ? <PersonView person={person} />  : null ;


    if(!this.state.person || !this.state.showPersonDetails){
      return(
        <span>Select a person to see details</span>
      )
    }

    return(
      <div>
        {isLoading}
        {isReady}
        <button 
          onClick={()=> { this.onHideDetails(); this.props.resetPerson() ; } }
          className='btn btn-success btn-lg'>
            Hide person details
        </button>
        
        <ErrorButton />
      </div>
    )
  }
}

const PersonView = ({person}) => {

  const {id, name, gender, birthYear, eyeColor} = person;

  return (
    
    <div className="person-details card">
      <img className="person-image" alt='person'
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