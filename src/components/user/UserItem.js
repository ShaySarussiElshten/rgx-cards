import React from 'react';
import './UserItem.css';

const UserItem = props => {

  const {
    backgroundColor,
    image,
    lastName,
    firstName,
    email,
    gender} = props

  return (
    <li className="user-item">
        <div className="card-container" style={{backgroundColor:backgroundColor}}>

          <img className="round" src={image} alt="user" />
          <h3>{firstName} {lastName}</h3>
          <h6>{email}</h6>
          <p>{gender === 'male' ? <i aria-hidden="true" className="male large icon"></i> :
          <i aria-hidden="true" className="female large icon"></i>
        }</p>
          
        </div>
    </li>
  );
};

export default UserItem;
